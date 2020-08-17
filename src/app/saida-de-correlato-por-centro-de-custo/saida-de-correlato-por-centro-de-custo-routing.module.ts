import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarSaidaDeCorrelatoComponent } from './pesquisar-saida-de-correlato/pesquisar-saida-de-correlato.component';
import { CadastrarSaidaDeCorrelatoComponent } from './cadastrar-saida-de-correlato/cadastrar-saida-de-correlato.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {
    path: 'saidacorrelatoporcentrodecusto',
    component: PesquisarSaidaDeCorrelatoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_SAIDA_DE_CORRELATO'] }
  },
  {
    path: 'saidacorrelatoporcentrodecusto/novo',
    component: CadastrarSaidaDeCorrelatoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_SAIDA_DE_CORRELATO'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SaidaDeCorrelatoPorCentroDeCustoRoutingModule { }