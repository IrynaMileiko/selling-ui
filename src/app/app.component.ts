import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin:boolean = false;
  submitted = false;
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

  show()
  {
    if(this.showLogin){
      this.hide();
    }
    else{
      this.showLogin = true;
    }
  }
  hide()
  {
    this.showLogin = false;
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
