import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) {
  }

  updateUserPassword(userPass: UserUpdatePassword) {
    let url = 'http://localhost:8081/api/update/updatePassword';
    let token = localStorage.getItem('token');
    if (token == null)
      token = "";
    console.log(token);
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'text'
    };
    return this.http.put(url, userPass, options);
  }

  updateUserEmail(userEmail: UserUpdateEmail) {
    let url = 'http://localhost:8081/api/update/updateEmail';
    let token = localStorage.getItem('token');
    if (token == null)
      token = "";
    console.log(token);
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'text'
    };
    return this.http.put(url, userEmail, options);
  }

  updateUserInfo(userInfo: UserUpdateInfo) {
    let url = 'http://localhost:8081/api/update/updateInfo';
    let token = localStorage.getItem('token');
    if (token == null)
      token = "";
    console.log(token);
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'text'
    };
    return this.http.put(url, userInfo, options);
  }
}

export interface UserUpdatePassword {
  oldPassword: String;
  newPassword: String;
}

export interface UserUpdateEmail {
  newEmail: String;
}

export interface UserUpdateInfo {
  firstName: String;
  lastName: String;
  phoneNumber: String;
}
