import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
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
import { NaoAutorizadoComponent } from './nao-autorizado.component';

import { Title } from '@angular/platform-browser';
import { CategoriaCorrelatoService } from '../categoria-correlato/categoria-correlato.service';
import { TiposCorrelatosService } from '../tipos-de-correlatos/tipos-correlatos.service';
import { CentroDeCustoService } from '../centro-de-custo/centro-de-custo.service';
import { SaidaDeMedicamentoService } from '../saida-de-medicamento/saida-de-medicamento.service';
import { CadastrarSaidaCentroDeCustoService } from '../saida-medicmento-centro-de-custo/cadastrar-saida-centro-de-custo.service';
import { CadastrarSaidaDeCorrelatoService } from '../saida-de-correlato-por-centro-de-custo/cadastrar-saida-de-correlato.service';
import { AuthService } from '../seguranca/auth.service';
import { DashboardService } from '../dashboard/dashboard.service';

// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports:[
    NavbarComponent,
    ToastModule,
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
    CentroDeCustoService,
    SaidaDeMedicamentoService,
    CadastrarSaidaCentroDeCustoService,
    CadastrarSaidaDeCorrelatoService,
    AuthService,
    DashboardService,
    Title,
    {
      provide: LOCALE_ID , useValue:'pt-BR'
    },
    ErrorHandlerService,
    MessageService
  ]
})
export class CoreModule { }
