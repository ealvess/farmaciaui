import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisaCorrelatosComponent } from './pesquisa-correlatos/pesquisa-correlatos.component';
import { CadastrarCorrelatosComponent } from './cadastrar-correlatos/cadastrar-correlatos.component';


const routes: Routes = [
  { path: 'entradacorrelatos', component: PesquisaCorrelatosComponent },
  { path: 'entradacorrelatos/novo', component: CadastrarCorrelatosComponent },
  { path: 'entradacorrelatos/:codigo', component: CadastrarCorrelatosComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EntradaDeCorrelatosRoutingModule { }