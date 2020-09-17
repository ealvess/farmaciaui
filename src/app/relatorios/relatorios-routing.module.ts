import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioComponent } from './relatorio/relatorio.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'relatorios',
    component: RelatorioComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ENTRADA_DE_MEDICAMENTO'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
