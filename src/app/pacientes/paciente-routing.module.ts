import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarPacienteComponent } from './pesquisar-paciente/pesquisar-paciente.component';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';



const routes: Routes = [
  { path: 'pacientes', component: PesquisarPacienteComponent },
  { path: 'pacientes/novo', component: CadastrarPacienteComponent },
  { path: 'pacientes/:codigo', component: CadastrarPacienteComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }