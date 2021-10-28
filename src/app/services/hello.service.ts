import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

private url='http://localhost:8081/api/user/hello';
user:User;

ngOnInit(){
  this.user={
    email:'someEmail@gmail.com',
    firstName:'Andrew',
    lastName:'McLagen',
    password:'veryCoolPSW123'
  };
}


  constructor(private http: HttpClient) {
    this.user={
      email:'someEmail@gmail.com',
      firstName:'Andrew',
      lastName:'McLagen',
      password:'veryCoolPSW123'
    };
   }

  getHello() {
  	return this.http.get(this.url,
      {responseType:'text'});
  }
    tryRegister() {
    let url='http://localhost:8081/api/v1/registration/registrationUser';
    	return this.http.post(url, this.user,
        {responseType:'text'});
    }


}

interface User{
  email: String;
  firstName:String;
  lastName:String;
  password:String;
}
