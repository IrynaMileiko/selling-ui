import { Component, OnInit } from '@angular/core';
import { HelloService } from '../../services/hello.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
posts : any;

  constructor(private helloService: HelloService) { }

  ngOnInit(): void {
  }

getHello(){
    this.helloService.getHello().subscribe(
	     (response) => { this.posts = response; },
	      (error) => { this.posts="Error";console.log(error); });
}

}
