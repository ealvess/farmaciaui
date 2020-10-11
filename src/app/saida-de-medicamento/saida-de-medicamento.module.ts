import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TabMenuModule} from 'primeng/tabmenu';

import { PesquisarSaidaComponent } from './pesquisar-saida/pesquisar-saida.component';
import { SaidaDeMedicamentoRoutingModule } from './saida-de-medicamento-routing.module';
import { CadastrarSaidaPorPacienteComponent } from './cadastrar-saida-por-paciente/cadastrar-saida-por-paciente.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [PesquisarSaidaComponent, CadastrarSaidaPorPacienteComponent],
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

    SaidaDeMedicamentoRoutingModule
  ]
})
export class SaidaDeMedicamentoModule { }
