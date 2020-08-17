import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisarSaidaCentroDeCustoComponent } from './pesquisar-saida-centro-de-custo/pesquisar-saida-centro-de-custo.component';
import { CadastrarSaidaCentroDeCustoComponent } from './cadastrar-saida-centro-de-custo/cadastrar-saida-centro-de-custo.component';
import { SaidaDeMedicamentoCentroDeCustoRoutingModule } from './saida-de-medicamento-centro-de-custo-routing.module';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';



@NgModule({
  declarations: [PesquisarSaidaCentroDeCustoComponent, CadastrarSaidaCentroDeCustoComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    TabMenuModule,

    SaidaDeMedicamentoCentroDeCustoRoutingModule
  ]
})
export class SaidaMedicmentoCentroDeCustoModule { }
