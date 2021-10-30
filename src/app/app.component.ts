import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from './services/authorization/authorization.service';
import { User, UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  regEEmail = new RegExp("^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)$");
  showLogin:boolean = false;
  submitted = false;
  login:string;
  password:string;
  loginMsg:string;
  passwordMsg:string;
  invalidLogin:boolean;
  invalidPassword:boolean;
  token:any ="";

  constructor(private authService:AuthorizationService, private toastr: ToastrService
            , private router: Router) {
    this.login='';
    this.password='';
    this.loginMsg='';
    this.passwordMsg='';
    this.invalidPassword=false;
    this.invalidLogin=false;
    this.token = sessionStorage.getItem('token');
   }

   tryLogin(user:User){
       this.authService.tryLogin(user).subscribe(
   	     (response) => {
           //alert(response);
           console.log(response);
           let obj = JSON.parse(response);
           sessionStorage.setItem('token',obj.token);
           this.token = sessionStorage.getItem('token');
           this.hide();
           this.router.navigate(['/profile']).then(() => {
             this.successLoginToaster();
           })
         },
   	      (error) => {
            console.log(error);
            switch (error.status) {
              case 403:
                //alert(error.error);
                this.errorLoginToaster(error.error);
                break;
              case 0:
                //alert("Couldn't connect to the server");
                this.errorLoginToaster("Couldn't connect to the server");
                break;
              default:
               //alert(error.error);
               this.errorLoginToaster(error.error);
          }
          });
   }


successLoginToaster(){
   this.toastr.success("You have successfully logged in", 'Success!', {
     positionClass: 'toast-bottom-right'
   });
}
errorLoginToaster(msg:string){
 this.toastr.warning(msg, 'Error!', {
   positionClass: 'toast-bottom-right'
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
    if(this.login.search(this.regEEmail)==-1){
      this.invalidLogin=true;
      this.loginMsg="Invalid format";
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
