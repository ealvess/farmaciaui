import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { FornecedorService } from '../fornecedores/fornecedor.service';
import { EntradaDeMedicamentoService } from '../entrada-de-medicamentos/entrada-de-medicamento.service';
import { TiposDeMedicamentosService } from '../tipos-de-medicamentos/pesquisar-tipos-de-medicamentos.service';
import { MedicosService } from '../medicos/medicos.service';
import { PacienteService } from '../pacientes/paciente.service';
import { EntradaCorrelatosService } from '../entrada-de-correlatos/entrada-correlatos.service';


import {ConfirmationService} from 'primeng/api';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { CategoriaCorrelatoService } from '../categoria-correlato/categoria-correlato.service';
import { TiposCorrelatosService } from '../tipos-de-correlatos/tipos-correlatos.service';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  exports:[
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers:[
    FornecedorService,
    EntradaDeMedicamentoService,
    EntradaCorrelatosService,
    ConfirmationService,
    MedicosService,
    TiposDeMedicamentosService,
    PacienteService,
    CategoriaCorrelatoService,
    TiposCorrelatosService,
    Title,
    {
      provide: LOCALE_ID , useValue:'pt-BR'
    },
    ErrorHandlerService
  ]
})
export class CoreModule { }
