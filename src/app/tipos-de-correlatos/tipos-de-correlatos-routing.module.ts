import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarTiposCorrelatosComponent } from './pesquisar-tipos-correlatos/pesquisar-tipos-correlatos.component';
import { CadastrarTiposCorrelatosComponent } from './cadastrar-tipos-correlatos/cadastrar-tipos-correlatos.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'tiposcorrelatos',
    component: PesquisarTiposCorrelatosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CORRELATO'] }
  },
  {
    path: 'tiposcorrelatos/novo',
    component: CadastrarTiposCorrelatosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CORRELATO'] }
  },
  {
    path: 'tiposcorrelatos/:codigo',
    component: CadastrarTiposCorrelatosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CORRELATO'] }
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiposDeCorrelatosRoutingModule { }