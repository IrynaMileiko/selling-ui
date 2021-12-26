import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlInfoService {
  url:string = 'http://localhost:4200';

  getUrl(){
    return this.url;
  }

  constructor() { }
}
