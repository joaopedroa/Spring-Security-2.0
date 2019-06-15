import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _service: ServiceService, private _router:Router){
  
  }
  canActivate():boolean{
    if(this._service.loggedIn()){
      return true
    }else{
      this._router.navigate([''])
      return false
    }
  }

 
  
}
