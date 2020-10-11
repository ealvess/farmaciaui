import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisarCategoriaCorrelatoComponent } from './pesquisar-categoria-correlato/pesquisar-categoria-correlato.component';

import { CategoriasCorrelatoRoutingModule } from './categorias-correlato-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { CadastrarCategoriaCorrelatoComponent } from './cadastrar-categoria-correlato/cadastrar-categoria-correlato.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PesquisarCategoriaCorrelatoComponent, CadastrarCategoriaCorrelatoComponent],
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

    CategoriasCorrelatoRoutingModule
  ]
})
export class CategoriaCorrelatoModule { }
