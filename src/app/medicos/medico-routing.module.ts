import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarMedicosComponent } from './pesquisar-medicos/pesquisar-medicos.component';
import { CadastrarMedicoComponent } from './cadastrar-medico/cadastrar-medico.component';



const routes: Routes = [
  { path: 'medicos', component: PesquisarMedicosComponent },
  { path: 'medicos/novo', component: CadastrarMedicoComponent },
  { path: 'medicos/:codigo', component: CadastrarMedicoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }