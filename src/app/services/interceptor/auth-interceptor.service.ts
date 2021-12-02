import { Injectable } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {//implements HttpInterceptor {

  refreshingAccessToken: boolean;
  constructor(private authorizationService: AuthorizationService) {
    this.refreshingAccessToken = false;
  }


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(req).pipe(
  //     catchError((err: HttpErrorResponse) => {
  //       console.log(err)
  //       if (this.refreshingAccessToken) return throwError(err)
  //       if (err.status == 401 ) {
  //         return this.refreshAccessToken().pipe(
  //           switchMap(() => {
  //             req = this.addAuthHeader(req)
  //             return next.handle(req)
  //           })
  //
  //         )
  //       }
  //       return throwError(err)
  //     })
  //   )
  //
  // }


  refreshAccessToken() {
    return this.authorizationService.getNewAccessToken().pipe(
      tap((response) => {
        let obj = JSON.parse(response)
        console.log(obj.token)
        this.authorizationService.setAccessToken(obj.token)
      })
    )
  }



  addAuthHeader(req: HttpRequest<any>) {
    let token = this.authorizationService.getAccessToken();
    if (token) {
      // append the access token to the request header
      return req.clone({
        setHeaders: {
          'Authorization': token
        }
      })
    }
    if (token != null) {
      localStorage.setItem("token", token)
    }
    return req;

  }


}
