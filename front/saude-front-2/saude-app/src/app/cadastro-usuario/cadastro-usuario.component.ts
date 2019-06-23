import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../model/Usuario';
import { ServiceService } from '../services/service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource,MatIconModule, MatSort} from '@angular/material';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  formularioDeUsuario: FormGroup;
  allUsers:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name','username','email','roles','actions'];
  dataSource ;
  searchKey:string;
  salvar

  constructor(private fb: FormBuilder, public _service:ServiceService) { 
    this.getAllUsuarios();
  }

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

    if(dadosFormulario.id != null || dadosFormulario.id != undefined){
      usuario.id = dadosFormulario.id;
      this._service.atualizarUsuario(usuario).subscribe(data =>{
        this.getAllUsuarios();
      });
    }else{
    
    this._service.cadastrarUsuario(usuario).subscribe(data =>{
      console.log(data);
      this.getAllUsuarios();
    }, erro =>{     
      console.log(erro);
     
    });
  }
    this.formularioDeUsuario.reset();
  }

  getAllUsuarios(){
    this._service.getAllUsuarios().subscribe(data =>{
      this.allUsers =  data;      
      this.dataSource= new MatTableDataSource(this.allUsers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
  }

  excluirUsuario(id:any){
    this._service.excluirUsuario(id).subscribe(data=>{
      alert("Usuário excluído com sucesso!!!");
      this.getAllUsuarios();
    });
  }

  editarUsuario(user:Usuario){
    this.formularioDeUsuario.setValue({
      id:  user['id'],
      nome :  user['name'],
      email : user['email'],
      usuario: user['username'],
      senha: ''

    });

  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      id: [''],
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
