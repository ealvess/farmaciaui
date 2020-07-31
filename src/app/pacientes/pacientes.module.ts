import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisarPacienteComponent } from './pesquisar-paciente/pesquisar-paciente.component';

import { PacienteRoutingModule } from './paciente-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';



@NgModule({
  declarations: [PesquisarPacienteComponent, CadastrarPacienteComponent],
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

    SharedModule,

    PacienteRoutingModule
  ]
})
export class PacientesModule { }
