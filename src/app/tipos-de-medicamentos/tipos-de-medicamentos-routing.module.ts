import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarTiposDeMedicamentosComponent } from './pesquisar-tipos-de-medicamentos/pesquisar-tipos-de-medicamentos.component';
import { CadastrarTiposDeMedicamentosComponent } from './cadastrar-tipos-de-medicamentos/cadastrar-tipos-de-medicamentos.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  { 
    path: 'tiposmedicamentos', 
    component: PesquisarTiposDeMedicamentosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_MEDICAMENTO'] }
   },
  { 
    path: 'tiposmedicamentos/novo', 
    component: CadastrarTiposDeMedicamentosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MEDICAMENTO'] }
  },
  { path: 'tiposmedicamentos/:codigo', 
  component: CadastrarTiposDeMedicamentosComponent,
  canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MEDICAMENTO'] }
 },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiposDeMedicamentosRoutingModule { }