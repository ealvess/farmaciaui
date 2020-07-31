import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarEntradaDeMedicamentosComponent } from './pesquisar-entrada-de-medicamentos/pesquisar-entrada-de-medicamentos.component';
import { CadastrarEntradaDeMedicamentosComponent } from './cadastrar-entrada-de-medicamentos/cadastrar-entrada-de-medicamentos.component';

const routes: Routes = [
  { path: 'entradamedicamentos', component: PesquisarEntradaDeMedicamentosComponent },
  { path: 'entradamedicamentos/novo', component: CadastrarEntradaDeMedicamentosComponent },
  { path: 'entradamedicamentos/:codigo', component: CadastrarEntradaDeMedicamentosComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EntradaDeMedicamentosRoutingModule { }