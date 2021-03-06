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
      lastName:""
    };
   }

   getUser(){
     return this.user;
   }
   setEmail(email:String){
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
  email:String;
  password:String;
  firstName:String;
  lastName:String;
}
