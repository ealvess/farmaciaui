import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'fornecedores',
    component: FornecedorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_FORNECEDOR'] }
  },
  {
    path: 'fornecedores/novo',
    component: CadastroFornecedorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FORNECEDOR'] }
  },
  {
    path: 'fornecedores/:codigo',
    component: CadastroFornecedorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FORNECEDOR'] }
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }