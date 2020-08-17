import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarCentroDeCustoComponent } from './pesquisar-centro-de-custo/pesquisar-centro-de-custo.component';
import { CadastrarCentroDeCustoComponent } from './cadastrar-centro-de-custo/cadastrar-centro-de-custo.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'centrodecusto',
    component: PesquisarCentroDeCustoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CENTRO_DE_CUSTO'] }
  },
  {
    path: 'centrodecusto/nova',
    component: CadastrarCentroDeCustoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CENTRO_DE_CUSTO'] }
  },
  {
    path: 'centrodecusto/:codigo',
    component: CadastrarCentroDeCustoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CENTRO_DE_CUSTO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CentroDeCustoRoutingModule { }