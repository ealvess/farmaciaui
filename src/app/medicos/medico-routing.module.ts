import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarMedicosComponent } from './pesquisar-medicos/pesquisar-medicos.component';
import { CadastrarMedicoComponent } from './cadastrar-medico/cadastrar-medico.component';
import { AuthGuard } from '../seguranca/auth.guard';



const routes: Routes = [
  {
    path: 'medicos',
    component: PesquisarMedicosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_MEDICO'] }
  },
  {
    path: 'medicos/novo',
    component: CadastrarMedicoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MEDICO'] }
  },
  {
    path: 'medicos/:codigo',
    component: CadastrarMedicoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_MEDICO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }