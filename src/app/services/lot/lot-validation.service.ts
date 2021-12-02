import { Injectable } from '@angular/core';
import {Lot, LotExt, LotService} from '../../services/lot/lot.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LotValidationService {
  lotValid:LotValidation;

  constructor(public datepipe: DatePipe) {
    this.lotValid={
      id:0,
      name : "",
      invalidName: false,
      nameMsg : "",

      photoPath : "",
      photoMsg : "",
      invalidPhoto : false,
      displayPhotoPath : "",

      description : "",
      descrMsg : "",
      invalidDescr : false,

      startPrice : 0,
      startPriceMsg : "",
      invalidStartPrice : false,

      endPrice : 0,
      endPriceMsg : "",
      invalidEndPrice : false,

      startDate :"",
      startDateMsg : "",
      invalidStartDate : false,

      endDate : "",
      endDateMsg : "",
      invalidEndDate : false,

      location : "",
      locationMsg : "",
      invalidLocation : false,

      category: "",
      status: "",

      imgFileFormats : ['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'png'],

      curDate : new Date().toISOString().split('T')[0]
    }
   }

   getLot(lot: LotExt){
     this.lotValid={
       id:lot.id,
       name : lot.name,
       invalidName: false,
       nameMsg : "",

       photoPath : lot.imgPath,
       photoMsg : "",
       invalidPhoto : false,
       displayPhotoPath : "",

       description : lot.description,
       descrMsg : "",
       invalidDescr : false,

       startPrice : lot.startPrice,
       startPriceMsg : "",
       invalidStartPrice : false,

       endPrice : lot.minPrice,
       endPriceMsg : "",
       invalidEndPrice : false,

       startDate : String(this.datepipe.transform(lot.startDate, 'dd.MM.yyyy')),
       startDateMsg : "",
       invalidStartDate : false,

       endDate : String(this.datepipe.transform(lot.endDate,'dd.MM.yyyy')),
       endDateMsg : "",
       invalidEndDate : false,

       location : lot.location,
       locationMsg : "",
       invalidLocation : false,

       category : lot.category,
       status : lot.status,

       imgFileFormats : ['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'png'],

       curDate : new Date().toISOString().split('T')[0]
     }
     return this.lotValid;
   }

  getLotValidation(){
    return this.lotValid;
  }

  clearTotalValidate(){
    this.lotValid.invalidName= false;
    this.lotValid.invalidPhoto= false;
    this.lotValid.invalidDescr= false;
    this.lotValid.invalidStartPrice= false;
    this.lotValid.invalidEndPrice= false;
    this.lotValid.invalidStartDate= false;
    this.lotValid.invalidEndDate= false;
    this.lotValid.invalidLocation= false;
  }
}

export interface LotValidation{
  id:Number,
  name:String,
  invalidName:boolean,
  nameMsg:String,

  photoPath:string,
  photoMsg:string,
  invalidPhoto:boolean,
  displayPhotoPath:any,

  description:String,
  descrMsg:String,
  invalidDescr:boolean,

  startPrice:Number,
  startPriceMsg:String,
  invalidStartPrice:boolean,

  endPrice:Number,
  endPriceMsg:String,
  invalidEndPrice:boolean,

  startDate:String,
  startDateMsg:String,
  invalidStartDate:boolean,

  endDate:String,
  endDateMsg:String,
  invalidEndDate:boolean,

  location:String,
  locationMsg:String,
  invalidLocation:boolean,

  category:String,
  status:String,

  imgFileFormats:String[],

  curDate:String
}
