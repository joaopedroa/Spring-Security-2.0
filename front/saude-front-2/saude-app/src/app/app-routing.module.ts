import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './services/auth/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroUsuarioComponent , canActivate: [AuthGuard]},
  { path: 'home', component: InicioComponent , canActivate: [AuthGuard]},
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes,{useHash:true}) ]
})
export class AppRoutingModule { }
