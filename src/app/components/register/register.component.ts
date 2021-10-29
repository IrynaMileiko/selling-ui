import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
   providers:  [
     AuthorizationService,
     UserService
    ]
})
export class RegisterComponent implements OnInit {
  regEName = new RegExp("^([A-ZА-Я][a-zа-я]+[-.']*[A-ZА-Я]*[a-zа-я]+)$");
  regESpace = new RegExp("^(.* .*)$");
  regEEmail = new RegExp("^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)$");
  regEPhone = new RegExp("^\\+\\d{7,19}$");

  login:string;
  password:string;
  email:string;
  phone:string;
  firstName:string;
  lastName:string;
  confPassword:string;

  loginMsg:string;
  passwordMsg:string;
  emailMsg:string;
  phoneMsg:string;
  firstNameMsg:string;
  lastNameMsg:string;
  confPasswordMsg:string;

  invalidLogin:boolean;
  invalidPassword:boolean;
  invalidEmail:boolean;
  invalidPhone:boolean;
  invalidFirstName:boolean;
  invalidLastName:boolean;
  invalidConfPassword:boolean;

  constructor(private authService:AuthorizationService) {
  this.login='';
  this.password='';
  this.email='';
  this.phone='';
  this.firstName='';
  this.lastName='';
  this.confPassword='';

  this.loginMsg='';
  this.passwordMsg='';
  this.emailMsg='';
  this.phoneMsg='';
  this.firstNameMsg='';
  this.lastNameMsg='';
  this.confPasswordMsg='';

  this.invalidPassword=false;
  this.invalidLogin=false;
  this.invalidEmail=false;
  this.invalidPhone=false;
  this.invalidFirstName=false;
  this.invalidLastName=false;
  this.invalidConfPassword=false;
 }

  ngOnInit(): void {
  }

  tryRegister(user:User){
      this.authService.tryRegister(user).subscribe(
        (response) => {
          alert(response);
          console.log(response);
        },
         (error) => {
           console.log(error);
           switch (error.status) {
             case 403:
               alert(error.error);
               break;
             case 0:
               alert("Couldn't connect to the server");
               break;
             default:
              alert(error.error);
         }
         });
  }

register(){
  this.login=this.login.trim();
  this.password=this.password.trim();
  this.email=this.email.trim();
  this.phone=this.phone.trim();
  this.firstName=this.firstName.trim();
  this.lastName=this.lastName.trim();
  this.confPassword=this.confPassword.trim();
  if(this.validate()){
    let user:User = {
      email:this.email,
      password:this.password,
      token:"",
      firstName:this.firstName,
      lastName:this.lastName
    }
    this.tryRegister(user);
  }
}


  validate(){
    let goodLogin=this.validateLogin();
    let goodPassword=this.validatePassword();
    let goodEmail=this.validateEmail();
    let goodPhone=this.validatePhone();
    let goodFN=this.validateFirstName();
    let goodLN=this.validateLastName();
    let goodCP=this.validateConfirmPassword();
    return goodLogin&&goodPassword&&goodEmail&&
      goodPhone&&goodFN&&goodLN&&goodCP;
  }

  validateLogin(){
    this.invalidLogin=false;
    if(this.login.length==0){
      this.invalidLogin=true;
      this.loginMsg="This field is required";
    }
    if(this.login.search(this.regESpace)!=-1){
      this.invalidLogin=true;
      this.loginMsg="Login can't contain spaces";
      return false;
    }

    return true;
  }
  validatePassword(){
    this.invalidPassword=false;
    if(this.password.length==0){
      this.invalidPassword=true;
      this.passwordMsg="This field is required";
      return false;
    }
    if(this.password.search(this.regESpace)!=-1){
      this.invalidPassword=true;
      this.passwordMsg="Password can't contain spaces";
      return false;
    }

    return true;
  }
  validateEmail(){
    this.invalidEmail=false;
    if(this.email.length==0){
      this.invalidEmail=true;
      this.emailMsg="This field is required";
      return false;
    }
    if(this.email.search(this.regEEmail)==-1){
      this.invalidEmail=true;
      this.emailMsg="Invalid format";
      return false;
    }

    return true;
  }
  validatePhone(){
    this.invalidPhone=false;
    if(this.phone.length==0){
      this.invalidPhone=true;
      this.phoneMsg="This field is required";
      return false;
    }
    if(this.phone.search(this.regEPhone)==-1){
      this.invalidPhone=true;
      this.phoneMsg="Phone number should starts with '+' and have 7-19 digits";
      return false;
    }

    return true;
  }
  validateFirstName(){
    this.invalidFirstName=false;
    if(this.firstName.length==0){
      this.invalidFirstName=true;
      this.firstNameMsg="This field is required";
      return false;
    }
    if(this.firstName.search(this.regEName)==-1){
      this.invalidFirstName=true;
      this.firstNameMsg="Invalid format";
      return false;
    }

    return true;
  }
  validateLastName(){
    this.invalidLastName=false;
    if(this.lastName.length==0){
      this.invalidLastName=true;
      this.lastNameMsg="This field is required";
      return false;
    }
    if(this.lastName.search(this.regEName)==-1){
      this.invalidLastName=true;
      this.lastNameMsg="Invalid format";
      return false;
    }

    return true;
  }
  validateConfirmPassword(){
    this.invalidConfPassword=false;
    if(this.confPassword!=this.password){
      this.invalidConfPassword=true;
      this.confPasswordMsg="Passwords don't match";
      return false;
    }

    return true;
  }

}
