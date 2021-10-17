import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lotpanel',
  templateUrl: './lotpanel.component.html',
  styleUrls: ['./lotpanel.component.css']
})
export class LotpanelComponent implements OnInit {

    lots:Lot[];
    maxId:number;
    isAdd:boolean;
    isEmptyAddField:boolean;
    addErrorMessage:string;
    isEdit:boolean[];

  constructor() {
    this.maxId=0;
    this.lots=[];
    this.isAdd=false;
    this.isEmptyAddField=false;
    this.addErrorMessage='';
    this.isEdit=[];
    this.isEdit.push(false);
   }

  ngOnInit(): void {
  }


showAdd(){
  this.isAdd=!this.isAdd;
}

addLot(name:string, price:number, description:string){
  this.isEmptyAddField=false;
  let lot:Lot;
  if(name=="" || isNaN(price)){
    this.addErrorMessage='Поля "Название лота" и "Цена" не должны быть пустыми';
    this.isEmptyAddField=true;
    return;
  }
  if(price<10||price>100000){
    this.addErrorMessage='Цена должна быть в диапазоне от 10 до 100 000';
    this.isEmptyAddField=true;
    return;
  }
  lot={id:++this.maxId, name:name, price:price, description:description};
  this.lots.push(lot);
  this.isAdd=false;
  this.isEdit.push(false);
}

editLot(id:number){
  if(this.isEdit.length>=id){
    this.isEdit[id]=true;
  }
}

notEditLot(id:number){
  if(this.isEdit.length>=id){
    this.isEdit[id]=false;
  }
}

deleteLot(id:number){
  for(let i = 0; i< this.lots.length; i++){
    if(this.lots[i].id==id){
      this.lots.splice(i,1);
      break;
    }
  }
}

saveLot(id:number, name:string, price:number, description:string){
  if(name=="" || isNaN(price)){
    alert('Поля "Название лота" и "Цена" не должны быть пустыми');
    return;
  }
  if(price<10||price>100000){
    alert('Цена должна быть в диапазоне от 10 до 100 000');
    return;
  }
  for(let i = 0; i< this.lots.length; i++){
    if(this.lots[i].id==id){
      this.lots[i].name=name;
      this.lots[i].price=price;
      this.lots[i].description=description;
      this.isEdit[id]=false;
      break;
    }
  }
}

}


  interface Lot{
    id:number,
    name:string,
    price:number,
    description:string
  }
