import { Component, OnInit } from '@angular/core';
import { HelloService } from '../../services/hello.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
posts : any;

  constructor(private helloService: HelloService, private toastr: ToastrService,
      private router: Router, private authService:AuthorizationService, private titleService: Title) {
    titleService.setTitle('Home');
  }

  ngOnInit(): void {
  }

gotoRegister(){
  this.router.navigate(['/register']);
}

successLogoutToaster(){
   this.toastr.success("You have successfully logged out", 'Success!', {
     positionClass: 'toast-bottom-right'
   });
}


errorToaster(msg:string){
  this.toastr.warning(msg, 'Error!', {
    positionClass: 'toast-bottom-right'
  });
}

  notAuthToaster(){
      this.toastr.error("You need to log in first", 'Error!', {
        positionClass: 'toast-bottom-right'
      });
  }

}
