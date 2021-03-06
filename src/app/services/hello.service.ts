import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserService, User} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

private url='http://localhost:8081/api/v1/registration/hello';

ngOnInit(){
}


  constructor(private http: HttpClient) {
   }

  getHello() {
  	return this.http.get(this.url,
      {responseType:'text'});
  }
    tryRegister(user:User) {
    let url='http://localhost:8081/api/v1/registration/registrationUser';
    	return this.http.post(url, user,
        {responseType:'text'});
    }


}
