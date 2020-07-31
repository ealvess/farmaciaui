import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarCategoriaCorrelatoComponent } from './pesquisar-categoria-correlato/pesquisar-categoria-correlato.component';
import { CadastrarCategoriaCorrelatoComponent } from './cadastrar-categoria-correlato/cadastrar-categoria-correlato.component';


const routes: Routes = [
  { path: 'categoriascorrelato', component: PesquisarCategoriaCorrelatoComponent },
  { path: 'categoriascorrelato/novo', component: CadastrarCategoriaCorrelatoComponent },
  { path: 'categoriascorrelato/:codigo', component: CadastrarCategoriaCorrelatoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriasCorrelatoRoutingModule { }