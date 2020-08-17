import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarEntradaDeMedicamentosComponent } from './pesquisar-entrada-de-medicamentos/pesquisar-entrada-de-medicamentos.component';
import { CadastrarEntradaDeMedicamentosComponent } from './cadastrar-entrada-de-medicamentos/cadastrar-entrada-de-medicamentos.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'entradamedicamentos',
    component: PesquisarEntradaDeMedicamentosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ENTRADA_DE_MEDICAMENTO'] }
  },
  {
    path: 'entradamedicamentos/novo',
    component: CadastrarEntradaDeMedicamentosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ENTRADA_DE_MEDICAMENTO'] }
  },
  {
    path: 'entradamedicamentos/:codigo',
    component: CadastrarEntradaDeMedicamentosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ENTRADA_DE_MEDICAMENTO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EntradaDeMedicamentosRoutingModule { }