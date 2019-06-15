import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { HttpResponse } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public service:ServiceService, public _router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
     let tokenRequest = req.clone({
        setHeaders:{
          Authorization: localStorage.getItem('token') == null || localStorage.getItem('token') == undefined ? "" : localStorage.getItem('token') 
        }
      
    })
    return next.handle(tokenRequest).pipe(
      map((event: HttpEvent<any>) => {
       
        if (event instanceof HttpErrorResponse) {
          if(event.status === 401){
             this.service.logout();
             this._router.navigate(['']);
          }
         }         
          return event;
      }));
    }
  
}
