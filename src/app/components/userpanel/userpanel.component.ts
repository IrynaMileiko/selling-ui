import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {

      users:User[];
      maxId:number;
      isAdd:boolean;
      isEmptyAddField:boolean;
      addErrorMessage:string;
      isEdit:boolean[];

    constructor() {
      this.maxId=0;
      this.users=[];
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

  addUser(login:string, password:string){
    this.isEmptyAddField=false;
    let user:User;
    if(!login || login.length === 0 || !password || password.length === 0 ){
      this.addErrorMessage='Поля "Логин" и "Пароль" не должны быть пустыми';
      this.isEmptyAddField=true;
      return;
    }
    user={id:++this.maxId, login:login, password:password};
    this.users.push(user);
    this.isAdd=false;
    this.isEdit.push(false);
  }

  editUser(id:number){
    if(this.isEdit.length>=id){
      this.isEdit[id]=true;
    }
  }

  notEditUser(id:number){
    if(this.isEdit.length>=id){
      this.isEdit[id]=false;
    }
  }

  deleteUser(id:number){
    for(let i = 0; i< this.users.length; i++){
      if(this.users[i].id==id){
        this.users.splice(i,1);
        break;
      }
    }
  }

  saveUser(id:number, login:string, password:string){
    if(!login || login.length === 0 || !password || password.length === 0 ){
      alert('Поля "Название лота" и "Цена" не должны быть пустыми');
      return;
    }
    for(let i = 0; i< this.users.length; i++){
      if(this.users[i].id==id){
        this.users[i].login=login;
        this.users[i].password=password;
        this.isEdit[id]=false;
        break;
      }
    }
  }

  }


    interface User{
      id:number,
      login:string,
      password:string
    }
