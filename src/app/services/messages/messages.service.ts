import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {AuthorizationService} from '../authorization/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  writeLotMessage(lotId:Number){
    let token:string = this.authorizationService.getAccessToken()!;
    let json = {
      lot: lotId
    };
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', token)
        .set('responseType','text')
    };
    console.log(header);
    return this.http.post("http://localhost:8081/api/messageCenter/sendLotMessage", json, header);
  }

}
