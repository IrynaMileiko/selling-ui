import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from './services/authorization/authorization.service';
import { User, UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers:  [
     AuthorizationService,
     UserService
    ]
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

  constructor(private authService:AuthorizationService) {
    this.login='';
    this.password='';
    this.loginMsg='';
    this.passwordMsg='';
    this.invalidPassword=false;
    this.invalidLogin=false;
   }


   tryLogin(user:User){
       this.authService.tryLogin(user).subscribe(
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
          }
          });
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
    if(this.validate()){
      let user:User = {
        email:this.login,
        password:this.password,
        token:"",
        firstName:"",
        lastName:""
      }
      this.tryLogin(user);
    }
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
