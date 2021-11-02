import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
   }

    tryRegister(user:User) {
    let url='http://localhost:8081/api/v1/registration/registrationUser';
    	return this.http.post(url, user,
        {responseType:'text'});
    }
    tryLogin(user:User) {
    let url='http://localhost:8081/api/v1/auth/login';
      return this.http.post(url, user,
        {responseType:'text'});
    }
    logout(){
    let url='http://localhost:8081/api/v1/auth/logout';
    let token = localStorage.getItem('token');
    if(token==null)token="";
    console.log(token);
    var header = {
      headers: new HttpHeaders()
      .set('Authorization',  token)
    }
      return this.http.post(url,{},header);
    }
}


interface User{
  email:String;
  password:String;
  firstName:String;
  lastName:String;
}
