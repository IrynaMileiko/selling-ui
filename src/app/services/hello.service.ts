import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

private url='http://localhost:8081/api/user/hello';

  constructor(private http: HttpClient) { }

  getHello() {
  	return this.http.get(this.url,
      {responseType:'text'});
  }
}
