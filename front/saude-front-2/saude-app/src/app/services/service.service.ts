import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   url:any = "https://saudeapponline.herokuapp.com/";
   //url:any = "http://localhost:8080/";
   private readonly notifier: NotifierService;
 
   constructor(private http: HttpClient,notifierService: NotifierService) { 
    this.notifier = notifierService;
   }

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

  public getAllUsuarios(){
    return this.http.get(this.url + 'api/users/getAllUsers');
  }

  public excluirUsuario(id:any){
    return this.http.delete(this.url + 'api/users/deleteUser/' + id);
  }

  public atualizarUsuario(user:Usuario){
    return this.http.put(this.url + 'api/users/atualizaruser/', user);
  }

  public showNotify(tipo:string,mensagem:string){
    this.notifier.notify( tipo, mensagem );
  }

}
