import {Component, OnDestroy, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { EditProfileService, UserUpdatePassword, UserUpdateEmail, UserUpdateInfo } from '../../services/editProfile/edit-profile.service';
import {Lot, LotExt, LotService} from '../../services/lot/lot.service';
import {LotValidation, LotValidationService} from '../../services/lot/lot-validation.service';
import {UrlInfoService} from '../../services/common/url-info.service';
import {MessagesService} from '../../services/messages/messages.service';
import { formatDate } from "@angular/common";
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute} from '@angular/router';
import {chatMsg, channel, MessageCenterService} from '../../services/message_center/message-center.service';
import {EventSourcePolyfill} from 'ng-event-source';
import {data} from "jquery";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  links:string[] = ['edit','settings','password','myLots', 'messages'];

  tabIndex:number = 0;

  regEName = new RegExp("^([A-ZА-Я][a-zа-я]+[-.']*[A-ZА-Я]*[a-zа-я]+)$");
  regESpace = new RegExp("^(.* .*)$");
  regEEmail = new RegExp("^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)$");
  regEPhone = new RegExp("^\\+\\d{7,19}$");

  avatarPath: string = "";
  photoMsg: string = "";
  displayPhotoPath: any = "";

  oldPassword: String;
  newPassword: String;
  passwordMsg: String;
  emailMsg: String;
  oldPasswordMsg: String;
  newPasswordMsg: String;
  newEmail: String;
  phone: String;
  phoneMsg: String;
  firstName: String;
  lastName: String;
  firstNameMsg: String;
  lastNameMsg: String;

  invalidOldPassword: boolean;
  invalidNewPassword: boolean;
  invalidPhoto: boolean;
  invalidEmail: boolean;
  invalidPhone: boolean;
  invalidFirstName: boolean;
  invalidLastName: boolean;

  imgFileFormats: String[] = ['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'png'];
  myLots: LotExt[];

  showLotB: boolean = false;
  lotValidation: LotValidation;

  channel: any;
  messages: chatMsg[] = [];
  newMessage = '';
  channelList: Array<channel>;
  currentTargetUserId: number;
  currentChannelIndex: number;

  eventSource: EventSourcePolyfill | undefined;

  scrollHeight: number;

  constructor(private toastr: ToastrService, private router: Router, private authService: AuthorizationService,
      private editProfileService: EditProfileService, private lotService:LotService, public lotValid: LotValidationService,
      public datepipe: DatePipe, public urlInfoService:UrlInfoService, private titleService: Title,
      private activateRoute: ActivatedRoute, private messageService: MessagesService, private chatService: MessageCenterService) {
    //titleService.setTitle('Profile');
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/']).then(() => {
        this.notAuthToaster();
      })
    }
    let smth = this.activateRoute.snapshot.params['tab'];
    //console.log(smth);
    this.tabIndex=this.links.indexOf(smth);
    this.titleService.setTitle('Profile/'+smth)
    if(this.tabIndex==-1){
      this.tabIndex=0;
      this.titleService.setTitle('Profile');
      this.router.navigate(['/profile'])
    }
    if(this.tabIndex==3){
      this.getUsersLot();
    }
    this.myLots = [];
    this.lotValidation = lotValid.getLotValidation();
    this.oldPassword = "";
    this.newPassword = "";
    this.passwordMsg = "";
    this.emailMsg = "";
    this.oldPasswordMsg = "";
    this.newPasswordMsg = "";
    this.newEmail = "";
    this.phone = "";
    this.phoneMsg = "";
    this.firstName = "";
    this.lastName = "";
    this.firstNameMsg = "";
    this.lastNameMsg = "";

    this.invalidOldPassword = false;
    this.invalidNewPassword = false;
    this.invalidPhoto = false;
    this.invalidEmail = false;
    this.invalidPhone = false;
    this.invalidFirstName = false;
    this.invalidLastName = false;

    this.channelList = [];
    this.currentChannelIndex = -1;
    this.currentTargetUserId = -1;

    this.scrollHeight = 0;
  }

  ngOnInit(): void {
    this.initChannels();
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this.eventSource?.close();
    this.chatService.unsubscribe();
  }
  changeTab(tab:any){
    this.tabIndex = tab.index;
    this.router.navigate(['/profile/'+this.links[this.tabIndex]]);
    this.titleService.setTitle('Profile/'+this.links[this.tabIndex]);
    if(this.tabIndex==3){
      this.getUsersLot();
    }
  }

  getFromLS(col:string){
    return localStorage.getItem(col);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

writeToBuyer(lotId:Number){
    this.messageService.writeLotMessage(lotId).subscribe(
      (response) => {
        //console.log(response);
        //this.hideAll();
        //this.changeTab({index:6});
        this.redirectTo('/profile/messages');
      },
      (error) => {
        console.log(error);
        if(error.status==400){
          this.errorToaster("This lot was not won");
        }
        else{
          this.errorToaster("Couldn't connect to the server");
        }
      });
  }

  uploadAvatar() {
    this.invalidPhoto = false;
    this.displayPhotoPath = "";
    if (!this.validateImgFormat()) {
      this.invalidPhoto = true;
      this.photoMsg = "Invalid img format. Supported formats:\n" + this.imgFileFormats;
      return;
    }
    let avatar = <HTMLInputElement>document.getElementById("avatar");
    let file: File = (<HTMLInputElement>document.getElementById("avatar"))!.files![0];
    const reader = new FileReader();
    reader.onload = e => this.displayPhotoPath = reader.result;

    reader.readAsDataURL(file);

  }

  validateImgFormat() {
    let subs = this.avatarPath.split('.');
    let format = subs[subs.length - 1];
    return this.imgFileFormats.includes(format);
  }

  onFileChanged(event: any) {
    this.avatarPath = event.target.files[0]
  }

  logout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('token');
        localStorage.setItem('firstName', 'Guest');
        this.router.navigate(['/']).then(() => {
          this.successLogoutToaster();
        })
      },
      (error) => {
        console.log(error);
        switch (error.status) {
          case 403:
            this.errorToaster(error.error);
            break;
          case 0:
            this.errorToaster("Couldn't connect to the server");
            break;
          default:
            this.errorToaster(error.error);
        }
      });
  }

  updatePassword() {
    if (this.validateOldPassword() && this.validateNewPassword()) {
      let userPass: UserUpdatePassword = { oldPassword: this.oldPassword, newPassword: this.newPassword };
      this.editProfileService.updateUserPassword(userPass).subscribe(
        (response) => {
          console.log(response);
          this.successPasswordChangeToaster();
          this.logout();
        },
        (error) => {
          this.errorToaster(error.status);
        });
    }
  }

  updateEmail() {
    if (this.validateEmail()) {
      let userEmail: UserUpdateEmail = { newEmail: this.newEmail };
      this.editProfileService.updateUserEmail(userEmail).subscribe(
        (response) => {
          console.log(response);
          this.successEmailChangeToaster();
          localStorage.removeItem('token');
          localStorage.setItem('firstName', 'Guest');
          this.router.navigate(['/']).then(() => {
            this.successLogoutToaster();
          })
        },
        (error) => {
          this.errorToaster(error.status);
        });
    }
  }

  updateInfo() {
    if (this.validateFirstName() && this.validateLastName() && this.validatePhone()) {
      let userInfo: UserUpdateInfo = { firstName: this.firstName, lastName: this.lastName, phoneNumber: this.phone }
      this.editProfileService.updateUserInfo(userInfo).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.errorToaster(error.status);
        });
    }
  }

  validateEmail() {
    this.invalidEmail = false;
    if (this.newEmail.length == 0) {
      this.invalidEmail = true;
      this.emailMsg = "This field is required";
      return false;
    }
    if (this.newEmail.search(this.regEEmail) == -1) {
      this.invalidEmail = true;
      this.emailMsg = "Invalid format";
      return false;
    }
    return true;
  }

  validateOldPassword() {
    this.invalidOldPassword = false;
    if (this.oldPassword.length == 0) {
      this.invalidOldPassword = true;
      this.oldPasswordMsg = "This field is required";
      return false;
    }
    if (this.oldPassword.search(this.regESpace) != -1) {
      this.invalidOldPassword = true;
      this.oldPasswordMsg = "Password can't contain spaces";
      return false;
    }
    return true;
  }

  validateNewPassword() {
    this.invalidNewPassword = false;
    if (this.newPassword.length == 0) {
      this.invalidNewPassword = true;
      this.newPasswordMsg = "This field is required";
      return false;
    }
    if (this.newPassword.search(this.regESpace) != -1) {
      this.invalidNewPassword = true;
      this.newPasswordMsg = "Password can't contain spaces";
      return false;
    }
    if (this.oldPassword === this.newPassword) {
      this.invalidNewPassword = true;
      this.newPasswordMsg = "Your new password cannot be same as your current password";
      return false;
    }
    return true;
  }

  validatePhone() {
    this.invalidPhone = false;
    if (this.phone.length == 0) {
      this.invalidPhone = true;
      this.phoneMsg = "This field is required";
      return false;
    }
    if (this.phone.search(this.regEPhone) == -1) {
      this.invalidPhone = true;
      this.phoneMsg = "Phone number should starts with '+' and have 7-19 digits";
      return false;
    }
    return true;
  }

  validateFirstName() {
    this.invalidFirstName = false;
    if (this.firstName.length == 0) {
      this.invalidFirstName = true;
      this.firstNameMsg = "This field is required";
      return false;
    }
    if (this.firstName.search(this.regEName) == -1) {
      this.invalidFirstName = true;
      this.firstNameMsg = "Invalid format";
      return false;
    }

    return true;
  }

  validateLastName() {
    this.invalidLastName = false;
    if (this.lastName.length == 0) {
      this.invalidLastName = true;
      this.lastNameMsg = "This field is required";
      return false;
    }
    if (this.lastName.search(this.regEName) == -1) {
      this.invalidLastName = true;
      this.lastNameMsg = "Invalid format";
      return false;
    }

    return true;
  }

  clearPasswordValidate() {
    this.invalidOldPassword = false;
    this.invalidNewPassword = false;
  }

  clearEmailValidate() {
    this.invalidEmail = false;
  }

  clearInfoValidate() {
    this.invalidFirstName = false;
    this.invalidLastName = false;
    this.invalidPhone = false;
  }

  showLot(index:number){
    this.showLotB=true;
    this.lotValidation = this.lotValid.getLot(this.myLots[index]);
    console.log(this.lotValidation);
  }

  dotDatetoDef(dat: String){
    let spl:String[] = dat.split(".");
    let res = spl[2]+"-"+spl[1]+"-"+spl[0];
    return res;
  }

    hideAll(){
      this.showLotB=false;
    }

  sortCol(sel:string){
    this.myLots = this.lotService.sortLots(this.myLots, sel);
  }

  getUsersLot(){
    this.myLots = [];
    this.lotService.getUsersLot().subscribe(
      (response) => {
        //console.log(response);
        let st = JSON.stringify(response);
        let res = JSON.parse(st);
        console.log(Object.values(res));
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            //console.log(curLot);
            let lot:LotExt|null = this.lotService.getJLot(JSON.stringify(res[key]));
            if(lot!=null)
              this.myLots.push(lot);
          }
        }
        console.log(this.myLots);
        //this.myLots = Array.of(res.json().results);
      },
      (error) => {
        console.log(error);
        this.myLots = [];
      });
  }


  successPasswordChangeToaster() {
    this.toastr.success("You have successfully changed your password", 'Success!', {
      positionClass: 'toast-bottom-right'
    });
  }

  successEmailChangeToaster() {
    this.toastr.success("You have successfully changed your email", 'Success!', {
      positionClass: 'toast-bottom-right'
    });
  }

  successLogoutToaster() {
    this.toastr.success("You have successfully logged out", 'Success!', {
      positionClass: 'toast-bottom-right'
    });
  }
    successToaster(msg:string) {
      this.toastr.success(msg, 'Success!', {
        positionClass: 'toast-bottom-right'
      });
    }

  errorToaster(msg: string) {
    this.toastr.warning(msg, 'Error!', {
      positionClass: 'toast-bottom-right'
    });
  }

  notAuthToaster() {
    this.toastr.error("You need to log in first", 'Error!', {
      positionClass: 'toast-bottom-right'
    });
  }

  initSubscription() {
    if (this.eventSource == undefined) {
      this.eventSource = this.chatService.subscribe();
      this.eventSource.onmessage = (data => {
        if (Number(data.data) == this.currentTargetUserId) {
          this.loadNewMessages(this.currentTargetUserId, this.channelList[this.currentChannelIndex].bidId);
        }
      });
    }
  }

  loadNewMessages(targetUser: number, bidId: number) {
    if (this.messages.length > 0) {
      let lastMessageId: number = this.messages[this.messages.length - 1].id;
      console.log(this.messages[this.messages.length - 1].id);
      this.chatService.getNewMessages(targetUser, bidId, lastMessageId).subscribe(response =>{
        this.messages = this.messages.concat(<chatMsg[]>response);
      }, error => {
        console.log(error);
      });
    }
  }

  initMessages(targetUser: number, bidId: number) {
    this.messages = [];
    this.chatService.getMessages(targetUser, bidId).subscribe(response => {
      this.messages = <chatMsg[]>response;
    }, error => {
      console.log(error);
    });
  }

  initChannels() {
    this.channelList=[];
    this.chatService.getChannels().subscribe(response => {
      //console.log(response);
      let st = JSON.stringify(response);
      let res = JSON.parse(st);
      //console.log(Object.values(res));
      for (let key in res) {
        if (res.hasOwnProperty(key)) {
          //console.log(curLot);
          let chnl:channel|null = this.chatService.getJChannel(JSON.stringify(res[key]));
          if(chnl!=null)
            this.channelList.push(chnl);
            console.log(chnl);
        }
      }
    }, error => {
      console.log(error)
    });
    console.log(this.channelList);
  }

  clickOnChannel(index: number) {
    if (this.currentChannelIndex != index) {
      this.initMessages(this.channelList[index].targetUserId, this.channelList[index].bidId);
      this.currentTargetUserId = this.channelList[index].targetUserId;
      this.currentChannelIndex = index;
    }
  }

  sendMessage() {
    if (this.newMessage != '') {
      this.chatService.sendMsg(this.currentTargetUserId, this.channelList[this.currentChannelIndex].bidId, this.newMessage).subscribe(response => {
        this.newMessage = '';
      }, error => {
        console.log(error)
      });
    }
  }

}
