import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

import { PesquisarCategoriaComponent } from './pesquisar-categoria/pesquisar-categoria.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CadastrarCategoriasComponent } from './cadastrar-categorias/cadastrar-categorias.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PesquisarCategoriaComponent, CadastrarCategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,

    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DialogModule,
    DropdownModule,

    SharedModule,
  ]
})
export class CategoriasDeMedicamentoModule { }
