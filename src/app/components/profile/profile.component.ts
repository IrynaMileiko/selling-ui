import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { EditProfileService, UserUpdatePassword, UserUpdateEmail, UserUpdateInfo } from '../../services/editProfile/edit-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

  constructor(private toastr: ToastrService, private router: Router, private authService: AuthorizationService, private editProfileService: EditProfileService) {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/']).then(() => {
        this.notAuthToaster();
      })
    }
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
  }

  ngOnInit(): void {
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

}
