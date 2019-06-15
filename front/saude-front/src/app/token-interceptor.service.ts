import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ServicesService } from './services.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( public service:ServicesService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log(req);

    
     let tokenRequest = req.clone({
        setHeaders:{
          Authorization: localStorage.getItem('token')
        }
      
    })
  

    return next.handle(tokenRequest).pipe(
      map((event: HttpEvent<any>) => {
       
        if (event instanceof HttpErrorResponse) {
          if(event.status === 401){
             this.service.logout();
          }
         } 

         if (event instanceof HttpResponse) {
          if(localStorage.getItem('token') == null){
            this.service.logout();
          };
        }
         
          return event;
      }));
    };
  }

