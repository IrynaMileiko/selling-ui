import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:string;
  password:string;
  loginMsg:string;
  passwordMsg:string;
  invalidLogin:boolean;
  invalidPassword:boolean;

  constructor() {
    this.login='';
    this.password='';
    this.loginMsg='';
    this.passwordMsg='';
    this.invalidPassword=false;
    this.invalidLogin=false;
   }

  ngOnInit(): void {
  }


  loginF(){
    this.login=this.login.trim();
    this.password=this.password.trim();
    this.validate();
  }

  validate(){
    return(this.validateLogin()&&this.validatePassword());
  }

  validateLogin(){
    if(this.login.length==0){
      this.invalidLogin=true;
      this.loginMsg="This field is required";
      return false;
    }

    return true;
  }

  validatePassword(){
    if(this.password.length==0){
      this.invalidPassword=true;
      this.passwordMsg="This field is required";
      return false;
    }

    return true;
  }

}
