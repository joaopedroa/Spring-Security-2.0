import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  constructor(private fb: FormBuilder, private service:ServicesService) { }

  formCadastro;

  ngOnInit() {
    this.formCadastro = this.fb.group({
      nome: [''],
      usuario: [],
      email: [],
      password: []
    });
  }

  cadastro(){
    console.log(this.formCadastro);
    var user = {
      "name":this.formCadastro.controls.nome.value,
      "username":this.formCadastro.controls.usuario.value,
      "email":this.formCadastro.controls.email.value,
      "role":['admin'],
      "password":this.formCadastro.controls.password.value
    };
   this.service.cadastroUsuario(user).subscribe(data =>{
      console.log(data);
   });
   }

}
