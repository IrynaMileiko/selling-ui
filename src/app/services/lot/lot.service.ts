import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotService {

categories:String[] = ["Toys", "Electronic devices", "Furniture", "Decoration"];
lots:Lot[] = [
  {
    id:1,
    name:"lot1",
    description:"important description",
    category:"Furniture",
    photo:"",
    startPrice:1003,
    endPrice:500,
    startDate:"2020-09-11",
    endDate:"2021-09-11",
    location:"Odessa"
  },
  {
    id:2,
    name:"lot2",
    description:"important description2",
    category:"Toys",
    photo:"",
    startPrice:103,
    endPrice:50,
    startDate:"2020-09-11",
    endDate:"2021-09-11",
    location:"Odessa"
  },
  {
    id:3,
    name:"lot3",
    description:"important description3333",
    category:"Toys",
    photo:"",
    startPrice:103,
    endPrice:50,
    startDate:"2020-09-11",
    endDate:"2021-09-11",
    location:"Odessa"
  }
];

  constructor() {
    if(localStorage.getItem('lots')==null){
      localStorage.setItem('lots',JSON.stringify(this.lots));
      localStorage.setItem('categories',JSON.stringify(this.categories));
    }
   }

  getLots(){
    return JSON.parse(localStorage.getItem("lots")!);
  }
  getCategories(){
    return JSON.parse(localStorage.getItem("categories")!);
  }
  setLots(lots:Lot[]){
    localStorage.setItem('lots',JSON.stringify(lots));
  }
  setCategories(categories:String[]){
    localStorage.setItem('lots',JSON.stringify(categories));
  }

  getLotById(id:number){
    let lots = this.getLots();
    for(let i = 0; i < lots.length; ++i){
      if(lots[i].id==id){
        return lots[i];
      }
    }
    return null;
  }

  getMaxId(){
    let lots = this.getLots();
    let ma = 0;
    for(let i=0;i<lots.length;++i){
      if(lots[i].id>ma){
        ma = lots[i].id;
      }
    }
    return ma;
  }

  addLot(lot:Lot){
    let lots = this.getLots();
    lots.push(lot);
    this.setLots(lots);
  }
  updateLot(lot:Lot, id:number){
    let lots = this.getLots();
    for(let i = 0; i <lots.length; ++i){
      if(lots[i].id==id){
        lots[i]=lot;
        this.setLots(lots);
        break;
      }
    }
  }
}

export interface Lot{
  id:number,
  name:String,
  description:String,
  category:string,
  photo:string,
  startPrice:Number,
  endPrice:Number,
  startDate:String,
  endDate:String,
  location:String
}
