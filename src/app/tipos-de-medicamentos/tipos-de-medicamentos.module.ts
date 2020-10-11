import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarTiposDeMedicamentosComponent } from './pesquisar-tipos-de-medicamentos/pesquisar-tipos-de-medicamentos.component';
import { TiposDeMedicamentosRoutingModule } from './tipos-de-medicamentos-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CadastrarTiposDeMedicamentosComponent } from './cadastrar-tipos-de-medicamentos/cadastrar-tipos-de-medicamentos.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PesquisarTiposDeMedicamentosComponent, CadastrarTiposDeMedicamentosComponent],
  imports: [
    CommonModule,
    SharedModule,

    TiposDeMedicamentosRoutingModule,

    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
  ]
})
export class TiposDeMedicamentosModule { }
