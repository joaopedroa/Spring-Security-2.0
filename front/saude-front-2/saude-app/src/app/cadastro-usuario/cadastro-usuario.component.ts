import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/Usuario';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  formularioDeUsuario: FormGroup;
  allUsers:any;

  constructor(private fb: FormBuilder, public _service:ServiceService) { }

  ngOnInit() {
    this.criarFormularioDeUsuario();
    this.getAllUsuarios();
  

  }

  cadastrarUsuario() {
    const dadosFormulario = this.formularioDeUsuario.value;

    const usuario = new Usuario(
      dadosFormulario.nome,
      dadosFormulario.email,
      dadosFormulario.usuario,
      'admin',
      dadosFormulario.senha
     
    );
    this._service.cadastrarUsuario(usuario).subscribe(data =>{
    
    }, erro =>{
     
      this.getAllUsuarios();
     
    });

    this.formularioDeUsuario.reset();
  }

  getAllUsuarios(){
    this._service.getAllUsuarios().subscribe(users =>{
      this.allUsers = users;
    });
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      nome: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      email: ['',Validators.compose([Validators.email])],
      usuario: ['',Validators.compose([Validators.required])],
      senha: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])]
    });
  }

  get nome() {
    return this.formularioDeUsuario.get('nome');
  }

  get email() {
    return this.formularioDeUsuario.get('email');
  }

  get cpf() {
    return this.formularioDeUsuario.get('cpf');
  }

  get nascimento() {
    return this.formularioDeUsuario.get('nascimento');
  }

  get senha() {
    return this.formularioDeUsuario.get('senha');
  }

  get confirmarSenha() {
    return this.formularioDeUsuario.get('confirmarSenha');
  }

}
