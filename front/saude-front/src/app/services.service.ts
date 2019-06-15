import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient,public router:Router) { }

  signIn(username:String,password:String){
    let headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE'});
    let options = {
      headers: headers
  }
    return this.http.post("http://localhost:8080/api/auth/signin",{'username': username, 'password': password});
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
   
    const token = this.getToken();
    
    return token != null;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  cadastroUsuario(usuario:any){
    return this.http.post("http://localhost:8080/api/auth/signup",usuario);
  }

}
