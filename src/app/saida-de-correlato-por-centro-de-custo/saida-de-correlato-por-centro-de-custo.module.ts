import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PesquisarSaidaDeCorrelatoComponent } from './pesquisar-saida-de-correlato/pesquisar-saida-de-correlato.component';
import { CadastrarSaidaDeCorrelatoComponent } from './cadastrar-saida-de-correlato/cadastrar-saida-de-correlato.component';
import { SaidaDeCorrelatoPorCentroDeCustoRoutingModule } from './saida-de-correlato-por-centro-de-custo-routing.module';
import { SharedModule } from '../shared/shared.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { from } from 'rxjs';



@NgModule({
  declarations: [PesquisarSaidaDeCorrelatoComponent, CadastrarSaidaDeCorrelatoComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    TabMenuModule,


    SaidaDeCorrelatoPorCentroDeCustoRoutingModule

  ]
})
export class SaidaDeCorrelatoPorCentroDeCustoModule { }
