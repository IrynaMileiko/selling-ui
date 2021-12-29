import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventSourcePolyfill} from 'ng-event-source';
import {AuthorizationService} from "../authorization/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class MessageCenterService {

  constructor(private http: HttpClient, private authService: AuthorizationService) {
  }

  getMsgs(targetUser: number, bidId: number) {
    let url = 'http://localhost:8081/api/messageCenter/getMessages?targetUser=' + targetUser + '&bidId=' + bidId;
    let token = this.authService.getAccessToken();
    if (token == null)
      token = "";
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get(url, options);
  }

  getChannels() {
    let url = 'http://localhost:8081/api/messageCenter/getMessageChannenls';
    let token = this.authService.getAccessToken();
    if (token == null)
      token = "";
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get(url, options);
  }

  sendMsg(targetUser: number, bidId: number, message: String) {
    let url = 'http://localhost:8081/api/messageCenter/sendMessage';
    let token = this.authService.getAccessToken();
    let json: message = {
      receiver: targetUser,
      message: message,
      bidId: bidId
    };
    if (token == null)
      token = "";
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post(url, json, options);
  }

  subscribe() {
    let token = this.authService.getAccessToken();
    return new EventSourcePolyfill("http://localhost:8081/api/messageCenter/subscribe",
      {headers: {Authorization: token}, heartbeatTimeout: Number.MAX_SAFE_INTEGER});
  }

  unsubscribe() {
    let url = 'http://localhost:8081/api/messageCenter/sendMessage';
    let token = this.authService.getAccessToken();
    if (token == null)
      token = "";
    const options = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    this.http.get(url, options);
  }

  
  getJChannel(js:string){
    let curChannel = JSON.parse(js);
    if(curChannel==null) return null;
    let lot:channel = {
      bidId: curChannel['bidId'],
      targetUserId:curChannel['targetUserId'],
      username:curChannel['username']
    };
    return curChannel;
  }
}

export interface chatMsg {
  id: number;
  sender: number;
  receiver: number;
  dateTime: String;
  message: String;
}

export interface channel {
  bidId: number;
  targetUserId: number;
  username: String;
}

export interface message {
  receiver: number;
  message: String;
  bidId: number;
}
