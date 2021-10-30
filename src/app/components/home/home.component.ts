import { Component, OnInit } from '@angular/core';
import { HelloService } from '../../services/hello.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
posts : any;

  constructor(private helloService: HelloService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

getHello(){
    this.helloService.getHello().subscribe(
	     (response) => { this.posts = response; },
	      (error) => {
          console.log(error);
          switch (error.status) {
            case 403:
              this.posts =error.error;
              break;
            case 0:
              this.posts ="Couldn't connect to the server";
              break;
            default:
             this.posts =error.error;
        }
        });
}

  showToaster(){
      this.toastr.success("Hello, I'm the toastr message.")
  }
}
