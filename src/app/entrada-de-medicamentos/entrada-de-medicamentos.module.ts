import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';


import { PesquisarEntradaDeMedicamentosComponent } from './pesquisar-entrada-de-medicamentos/pesquisar-entrada-de-medicamentos.component';
import { EntradaDeMedicamentosRoutingModule } from './entrada-de-medicamentos-routing.module';
import { CadastrarEntradaDeMedicamentosComponent } from './cadastrar-entrada-de-medicamentos/cadastrar-entrada-de-medicamentos.component';


@NgModule({
  declarations: [
    PesquisarEntradaDeMedicamentosComponent,
    CadastrarEntradaDeMedicamentosComponent,
  ],
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

    EntradaDeMedicamentosRoutingModule
  ],
  exports:[],
  providers:[]
})
export class EntradaDeMedicamentosModule { }
