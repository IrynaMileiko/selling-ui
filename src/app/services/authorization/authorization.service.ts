import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
   }

    tryRegister(user:User) {
    let url='http://localhost:8081/api/v1/registration/registrationUser';
    	return this.http.post(url, user,
        {responseType:'json'});
    }
    tryLogin(user:User) {
    let url='http://localhost:8081/api/v1/auth/login';
      return this.http.post(url, user,
        {responseType:'text'});
    }
}

interface User{
  token:String;
  email:String;
  password:String;
  firstName:String;
  lastName:String;
}
