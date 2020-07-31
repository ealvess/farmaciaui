import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';

const routes: Routes = [
  { path: 'fornecedores', component: FornecedorComponent },
  { path: 'fornecedores/novo', component: CadastroFornecedorComponent },
  { path: 'fornecedores/:codigo', component: CadastroFornecedorComponent }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }