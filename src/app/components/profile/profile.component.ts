import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private authService:AuthorizationService) {
    if(localStorage.getItem('token')==null){
        this.router.navigate(['/']).then(() => {
            this.notAuthToaster();
          })
    }
  }

  ngOnInit(): void {
  }


logout(){
  this.authService.logout().subscribe(
    (response) => {
      //alert(response);
      console.log(response);
      localStorage.removeItem('token');
      localStorage.setItem('firstName','Guest');
      this.router.navigate(['/']).then(() => {
        this.successLogoutToaster();
      })
    },
     (error) => {
       console.log(error);
       switch (error.status) {
         case 403:
         this.errorToaster(error.error);
          break;
         case 0:
           this.errorToaster("Couldn't connect to the server");
           break;
         default:
         this.errorToaster(error.error);
     }
     });
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
