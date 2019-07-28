import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  formularioDeLogin: FormGroup;

  constructor(private fb: FormBuilder, private _service:ServiceService, private _route:Router) { }

  ngOnInit() {
    this.criarFormularioDeLogin();
  }

  criarFormularioDeLogin() {
    this.formularioDeLogin = this.fb.group({
      usuario: ['',],    
      senha: ['',]
    });
  }

  fazerLogin(){
    
    const dadosFormulario = this.formularioDeLogin.value;
    let user  = new UsuarioLogin(dadosFormulario.usuario, dadosFormulario.senha);
    
    this._service.login(user).subscribe(success =>{
      this._service.showNotify('success', "Bem vindo!" );
        localStorage.setItem("token", success["tokenType"] + " " + success["accessToken"] );
        this._route.navigate(["/home"]);
    }, error =>{
     
        this._service.showNotify('error', "Usuário ou senha inválidos!" );
      
     
    });
  }

  


}
