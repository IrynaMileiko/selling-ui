import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Lot, LotService} from '../../services/lot/lot.service';

@Component({
  selector: 'app-lot-edit',
  templateUrl: './lot-edit.component.html',
  styleUrls: ['./lot-edit.component.css']
})
export class LotEditComponent implements OnInit {
id:number;
lot:Lot|null;

name:String;
invalidName:boolean = false;
nameMsg:String = "";

photoPath:string="";
photoMsg:string = "";
invalidPhoto:boolean = false;
displayPhotoPath:any;

description:String;
descrMsg:String = "";
invalidDescr:boolean = false;

startPrice:Number;
startPriceMsg:String = "";
invalidStartPrice:boolean = false;

endPrice:Number;
endPriceMsg:String = "";
invalidEndPrice:boolean = false;

startDate:String="";
startDateMsg:String = "";
invalidStartDate:boolean = false;

endDate:String="";
endDateMsg:String = "";
invalidEndDate:boolean = false;

location:String;
locationMsg:String = "";
invalidLocation:boolean = false;

imgFileFormats:String[] = ['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'png'];
  curDate:String = new Date().toISOString().split('T')[0];


  constructor(private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService,
        private lotService:LotService) {
    if(localStorage.getItem('token')==null){
        this.router.navigate(['/']).then(() => {
            this.notAuthToaster();
        })
    }
    let smth = this.activateRoute.snapshot.params['id'];
    if(isNaN(smth)){
      this.router.navigate(['/unknown']);
    }
    this.id = smth;
    this.lot = this.lotService.getLotById(this.id);
    if(this.lot==null){
      this.notYourToaster();
      this.router.navigate(['/']);
    }
    this.name = this.lot!.name;
    this.displayPhotoPath = this.lot!.photo;
    this.description = this.lot!.description;
    this.startPrice = this.lot!.startPrice;
    this.endPrice = this.lot!.endPrice;
    this.startDate = this.lot!.startDate;
    this.endDate = this.lot!.endDate;
    this.location = this.lot!.location;
   }

  ngOnInit(): void {
  }

  saveLot(){
    let validated = this.validateAll();
    if(!validated) return;

    let lot:Lot = {
      id:this.lotService.getMaxId(),
      name:this.name,
      description:this.description,
      category:this.getCategory(),
      photo:this.displayPhotoPath,
      startPrice:this.startPrice,
      endPrice:this.endPrice,
      startDate:this.startDate,
      endDate:this.endDate,
      location:this.location
    }

    this.lotService.updateLot(lot, this.id)
    this.router.navigate(['/buy']).then(() => {
        this.successToaster();
    })
  }

  validateAll(){
    this.clearTotalValidate();
    let validName = this.validateName();
    let validPhoto = this.validatePhoto();
    let validDescr = this.validateDescr();
    let validStPrice = this.validateStPrice();
    let validEPrice = this.validateEPrice();
    let validStDate = this.validateStDate();
    let validEDate = this.validateEDate();
    let validLocation = this.validateLocation();

    return(validName && validPhoto && validDescr && validStPrice &&
      validEPrice && validStDate && validEDate && validLocation);
  }

  validateName(){
    if(this.name == ""){
      this.invalidName = true;
      this.nameMsg = "This field is required";
      return false;
    }
    if(this.name.length > 100){
      this.invalidName = true;
      this.nameMsg = "Name is too long";
      return false;
    }

      return true;
  }
  validatePhoto(){
    if(this.displayPhotoPath == ""){
      this.invalidPhoto = true;
      this.photoMsg = "This field is required";
      return false;
    }


      return true;
  }
  validateDescr(){
    if(this.description.length > 500){
      this.invalidDescr = true;
      this.descrMsg = "Description text is too long";
      return false;
    }


      return true;
  }
  validateStPrice(){
    if(this.startPrice < 10 || this.startPrice > 1000000){
      this.invalidStartPrice = true;
      this.startPriceMsg = "Price should be between 10 and 1 000 000";
      return false;
    }


      return true;
  }
  validateEPrice(){
    if(this.endPrice < 10 || this.endPrice > 1000000){
      this.invalidEndPrice = true;
      this.endPriceMsg = "Price should be between 10 and 1 000 000";
      return false;
    }
    if(this.endPrice > this.startPrice){
      this.invalidEndPrice = true;
      this.endPriceMsg = "End price should be lower than start price";
      return false;
    }


      return true;
  }
  validateStDate(){
    let date:String = this.getStDate();
    this.startDate = date;
    if(date == ""){
      this.invalidStartDate = true;
      this.startDateMsg = "This field is required";
      return false;
    }
    if(date<=this.curDate && date!=this.lot!.startDate){
      this.invalidStartDate = true;
      this.startDateMsg = "Date can't be less than tomorrow";
      return false;
    }

      return true;
  }
  validateEDate(){
    let date:String = this.getEDate();
    this.endDate = date;
    if(date == ""){
      this.invalidEndDate = true;
      this.endDateMsg = "This field is required";
      return false;
    }
    if(this.endDate<=this.startDate){
      this.invalidEndDate = true;
      this.endDateMsg = "End date should be bigger than start date";
      return false;
    }

      return true;
  }
  validateLocation(){
    if(this.location == ""){
      this.invalidLocation = true;
      this.locationMsg = "This field is required";
      return false;
    }
    if(this.location.length > 100){
      this.invalidLocation = true;
      this.locationMsg = "Location is too long";
      return false;
    }

    return true;
  }

  clearTotalValidate(){
  this.invalidName = false;
  this.invalidDescr = false;
  this.invalidPhoto = false;
  this.invalidEndDate = false;
  this.invalidStartDate = false;
  this.invalidEndPrice = false;
  this.invalidStartPrice = false;
  this.invalidLocation = false;
  }

  getStDate(){
  let doc = (<HTMLInputElement>document.getElementById("startDate")).value;
  return doc;
  }
  getEDate(){
  let doc = (<HTMLInputElement>document.getElementById("endDate")).value;
  return doc;
  }
  getCategory(){
  let doc = (<HTMLInputElement>document.getElementById("categorySelect")).value;
  return doc;
  }

  uploadPhoto(){
  this.invalidPhoto = false;
  this.displayPhotoPath="";
  if(!this.validateImgFormat()){
    this.invalidPhoto=true;
    this.photoMsg = "Invalid img format. Supported formats:\n"+this.imgFileFormats;
    return;
  }
  let phP = <HTMLInputElement>document.getElementById("phP");
  let file:File = (<HTMLInputElement>document.getElementById("phP"))!.files![0];
  const reader = new FileReader();
  reader.onload = e => this.displayPhotoPath = reader.result;

  reader.readAsDataURL(file);

  }

  onFileChanged(event:any) {
    this.photoPath = event.target.files[0]
  }

  validateImgFormat(){
  let subs = this.photoPath.split('.');
  let format = subs[subs.length-1];
  return this.imgFileFormats.includes(format);

  }

  notAuthToaster(){
      this.toastr.error("You need to log in first", 'Error!', {
        positionClass: 'toast-bottom-right'
      });
  }
  notYourToaster(){
      this.toastr.error("You are not owner of this lot", 'Error!', {
        positionClass: 'toast-bottom-right'
      });
  }
  successToaster(){
      this.toastr.success("Lot have been saved", 'Success!', {
        positionClass: 'toast-bottom-right'
      });
  }
}
