import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarTiposCorrelatosComponent } from './pesquisar-tipos-correlatos/pesquisar-tipos-correlatos.component';
import { CadastrarTiposCorrelatosComponent } from './cadastrar-tipos-correlatos/cadastrar-tipos-correlatos.component';

const routes: Routes = [
  { path: 'tiposcorrelatos', component: PesquisarTiposCorrelatosComponent },
  { path: 'tiposcorrelatos/novo', component: CadastrarTiposCorrelatosComponent },
  { path: 'tiposcorrelatos/:codigo', component: CadastrarTiposCorrelatosComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TiposDeCorrelatosRoutingModule { }