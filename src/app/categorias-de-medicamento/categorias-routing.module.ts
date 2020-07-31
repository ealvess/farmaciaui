import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarCategoriaComponent } from './pesquisar-categoria/pesquisar-categoria.component';
import { CadastrarCategoriasComponent } from './cadastrar-categorias/cadastrar-categorias.component';

const routes: Routes = [
  { path: 'categorias', component: PesquisarCategoriaComponent },
  { path: 'categorias/nova', component: CadastrarCategoriasComponent },
  { path: 'categorias/:codigo', component: CadastrarCategoriasComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }