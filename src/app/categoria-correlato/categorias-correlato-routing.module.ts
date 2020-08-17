import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesquisarCategoriaCorrelatoComponent } from './pesquisar-categoria-correlato/pesquisar-categoria-correlato.component';
import { CadastrarCategoriaCorrelatoComponent } from './cadastrar-categoria-correlato/cadastrar-categoria-correlato.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  { 
    path: 'categoriascorrelato', 
    component: PesquisarCategoriaCorrelatoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CATEGORIA_DE_CORRELATO'] } 
  },
  { 
    path: 'categoriascorrelato/novo', 
    component: CadastrarCategoriaCorrelatoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIA_DE_CORRELATO'] }
  },
  { path: 'categoriascorrelato/:codigo', 
  component: CadastrarCategoriaCorrelatoComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ROLE_PESQUISAR_CATEGORIA_DE_CORRELATO'] }
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CategoriasCorrelatoRoutingModule { }