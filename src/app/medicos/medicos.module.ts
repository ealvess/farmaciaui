import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PesquisarMedicosComponent } from './pesquisar-medicos/pesquisar-medicos.component';
import { MedicoRoutingModule } from './medico-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CadastrarMedicoComponent } from './cadastrar-medico/cadastrar-medico.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [PesquisarMedicosComponent, CadastrarMedicoComponent],
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


    MedicoRoutingModule
  ]
})
export class MedicosModule { }
