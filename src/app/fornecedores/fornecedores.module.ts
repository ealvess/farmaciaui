import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

import { CadastroFornecedorComponent } from './cadastro-fornecedor/cadastro-fornecedor.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { SharedModule } from './../shared/shared.module';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';

@NgModule({
  declarations: [
    CadastroFornecedorComponent,
    FornecedorComponent
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

    SharedModule,
    FornecedoresRoutingModule
    
  ],
  exports:[]
})
export class FornecedoresModule { }
