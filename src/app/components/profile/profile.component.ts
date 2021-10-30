import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router) {
    if(sessionStorage.getItem('token')==null){
        this.router.navigate(['/']).then(() => {
            this.notAuthToaster();
          })
    }
  }

  ngOnInit(): void {
  }


    notAuthToaster(){
        this.toastr.error("You need to log in first", 'Error!', {
          positionClass: 'toast-bottom-right'
        });
    }

}
