import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarSaidaCentroDeCustoComponent } from './pesquisar-saida-centro-de-custo/pesquisar-saida-centro-de-custo.component';
import { CadastrarSaidaCentroDeCustoComponent } from './cadastrar-saida-centro-de-custo/cadastrar-saida-centro-de-custo.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  { 
    path: 'saidamedicamentocentrodecusto', 
    component: PesquisarSaidaCentroDeCustoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ITEM_SAIDA_MEDICAMENTO'] }
   },
  { 
    path: 'saidamedicamentocentrodecusto/novo', 
    component: CadastrarSaidaCentroDeCustoComponent,
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
export class SaidaDeMedicamentoCentroDeCustoRoutingModule { }