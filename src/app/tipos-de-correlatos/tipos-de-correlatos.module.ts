import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisarTiposCorrelatosComponent } from './pesquisar-tipos-correlatos/pesquisar-tipos-correlatos.component';
import { TiposDeCorrelatosRoutingModule } from './tipos-de-correlatos-routing.module';
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
import { CadastrarTiposCorrelatosComponent } from './cadastrar-tipos-correlatos/cadastrar-tipos-correlatos.component';



@NgModule({
  declarations: [PesquisarTiposCorrelatosComponent, CadastrarTiposCorrelatosComponent],
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

    TiposDeCorrelatosRoutingModule
  ]
})
export class TiposDeCorrelatosModule { }
