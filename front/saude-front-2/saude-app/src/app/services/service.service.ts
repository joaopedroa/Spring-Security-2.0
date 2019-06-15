import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   url:any = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

 public loggedIn(){
    return !!localStorage.getItem("token");
  }

  public login(user:UsuarioLogin){
    return this.http.post(this.url + "api/auth/signin", user);
  }

  public logout(){
    localStorage.removeItem('token');
  }

  public cadastrarUsuario(user:Usuario){
    return this.http.post(this.url + "api/auth/signup",user);
  }

}
