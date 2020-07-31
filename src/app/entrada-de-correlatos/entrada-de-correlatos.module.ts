import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaCorrelatosComponent } from './pesquisa-correlatos/pesquisa-correlatos.component';
import { EntradaDeCorrelatosRoutingModule } from '../entrada-de-correlatos/entrada-de-correlatos-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CadastrarCorrelatosComponent } from './cadastrar-correlatos/cadastrar-correlatos.component';



@NgModule({
  declarations: [PesquisaCorrelatosComponent, CadastrarCorrelatosComponent],
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

    EntradaDeCorrelatosRoutingModule
  ]
})
export class EntradaDeCorrelatosModule { }
