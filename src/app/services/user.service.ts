import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User;

  constructor() {
    this.user={
      token:"",
      email:"",
      password:"",
      firstName:"",
      lastName:"",
      phoneNumber:""
    };
   }

   getUser(){
     return this.user;
   }
   setEmail(email:string){
     this.user.email=email;
   }
   setToken(token:String){
     this.user.token=token;
   }
   setpassword(password:String){
     this.user.password=password;
   }
   setFirstName(firstName:String){
     this.user.firstName=firstName;
   }
   setLastName(lastName:String){
     this.user.lastName=lastName;
   }
}

export interface User{
  token:String;
  email:string;
  password:String;
  firstName:String;
  lastName:String;
  phoneNumber:String
}
