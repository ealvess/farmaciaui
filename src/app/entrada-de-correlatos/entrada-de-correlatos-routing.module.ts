import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisaCorrelatosComponent } from './pesquisa-correlatos/pesquisa-correlatos.component';
import { CadastrarCorrelatosComponent } from './cadastrar-correlatos/cadastrar-correlatos.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {
    path: 'entradacorrelatos',
    component: PesquisaCorrelatosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ENTRADA_DE_CORRELATO'] }
  },
  {
    path: 'entradacorrelatos/novo',
    component: CadastrarCorrelatosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ENTRADA_DE_CORRELATO'] }
  },
  {
    path: 'entradacorrelatos/:codigo',
    component: CadastrarCorrelatosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ENTRADA_DE_CORRELATO'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EntradaDeCorrelatosRoutingModule { }