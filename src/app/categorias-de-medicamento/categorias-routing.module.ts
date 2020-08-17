import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarCategoriaComponent } from './pesquisar-categoria/pesquisar-categoria.component';
import { CadastrarCategoriasComponent } from './cadastrar-categorias/cadastrar-categorias.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'categorias',
    component: PesquisarCategoriaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA_DE_MEDICAMENTO'] }
  },
  {
    path: 'categorias/nova',
    component: CadastrarCategoriasComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIA_DE_MEDICAMENTO'] }
  },
  { 
    path: 'categorias/:codigo', 
    component: CadastrarCategoriasComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIA_DE_MEDICAMENTO'] }
   }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }