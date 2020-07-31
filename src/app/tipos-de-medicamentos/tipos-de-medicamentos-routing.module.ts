import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarTiposDeMedicamentosComponent } from './pesquisar-tipos-de-medicamentos/pesquisar-tipos-de-medicamentos.component';
import { CadastrarTiposDeMedicamentosComponent } from './cadastrar-tipos-de-medicamentos/cadastrar-tipos-de-medicamentos.component';


const routes: Routes = [
  { path: 'tiposmedicamentos', component: PesquisarTiposDeMedicamentosComponent },
  { path: 'tiposmedicamentos/novo', component: CadastrarTiposDeMedicamentosComponent },
  { path: 'tiposmedicamentos/:codigo', component: CadastrarTiposDeMedicamentosComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiposDeMedicamentosRoutingModule { }