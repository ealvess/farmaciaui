import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarSaidaComponent } from './pesquisar-saida/pesquisar-saida.component';
import { CadastrarSaidaPorPacienteComponent } from './cadastrar-saida-por-paciente/cadastrar-saida-por-paciente.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {
    path: 'saidamedicamento',
    component: PesquisarSaidaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ITEM_SAIDA_MEDICAMENTO'] }
  },
  {
    path: 'saidamedicamento/novo',
    component: CadastrarSaidaPorPacienteComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ITEM_SAIDA_MEDICAMENTO'] }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SaidaDeMedicamentoRoutingModule { }