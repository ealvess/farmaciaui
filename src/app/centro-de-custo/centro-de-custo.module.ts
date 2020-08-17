import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisarCentroDeCustoComponent } from './pesquisar-centro-de-custo/pesquisar-centro-de-custo.component';
import { CadastrarCentroDeCustoComponent } from './cadastrar-centro-de-custo/cadastrar-centro-de-custo.component';
import { CentroDeCustoRoutingModule } from './centro-de-custo-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PesquisarCentroDeCustoComponent, CadastrarCentroDeCustoComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DialogModule,
    DropdownModule,
        
    SharedModule,

    CentroDeCustoRoutingModule
  ]
})
export class CentroDeCustoModule { }
