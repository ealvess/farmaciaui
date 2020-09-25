import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

const routes: Routes = [
  { path: 'cadastrar', component: NovoUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriarContaRoutingModule { }
