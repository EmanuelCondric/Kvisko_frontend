import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { retry, catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { globalParams } from '../app-defs/global-params';
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class HttpErrorInterceptor implements HttpInterceptor {
  
    constructor(private router: Router) { }
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
              window.alert(errorMessage);
            } else {
              // server-side error
              if (error.status == 401) {
                window.localStorage.clear();                        
                window.location.href = globalParams.appContextPath + globalParams.authLoginPath;
              }
              else if (error.status == 403) {
                window.alert('Niste autorizirani za odabranu akciju.');                        
                window.location.href = globalParams.appContextPath + globalParams.authLoginPath;
              }
              else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error.message}\nDescription: ${error.error.error.description}`;
                window.alert(errorMessage);
              }
            }
            //console.log(errorMessage);            
            return throwError(errorMessage);
          })
        )
    }
  }