import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriarContaRoutingModule } from './criar-conta-routing.module';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [NovoUsuarioComponent],
  imports: [
    CommonModule,
    CriarContaRoutingModule,

    FormsModule,

    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  exports:[
    NovoUsuarioComponent
  ]
})
export class CriarContaModule { }
