import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { EntradaDeMedicamentosModule } from './entrada-de-medicamentos/entrada-de-medicamentos.module';
import { CategoriasDeMedicamentoModule } from './categorias-de-medicamento/categorias.module';
import { TiposDeMedicamentosModule } from './tipos-de-medicamentos/tipos-de-medicamentos.module';
import { MedicosModule } from './medicos/medicos.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { EntradaDeCorrelatosModule } from './entrada-de-correlatos/entrada-de-correlatos.module';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaCorrelatoModule } from './categoria-correlato/categoria-correlato.module';
import { TiposDeCorrelatosModule } from './tipos-de-correlatos/tipos-de-correlatos.module';
import { SaidaDeMedicamentoModule } from './saida-de-medicamento/saida-de-medicamento.module';
import { CentroDeCustoModule } from './centro-de-custo/centro-de-custo.module';
import { SaidaMedicmentoCentroDeCustoModule } from './saida-medicmento-centro-de-custo/saida-medicmento-centro-de-custo.module';
import { SaidaDeCorrelatoPorCentroDeCustoModule } from './saida-de-correlato-por-centro-de-custo/saida-de-correlato-por-centro-de-custo.module';
import { SegurancaModule } from './seguranca/seguranca.module'
import { DashboardModule } from './dashboard/dashboard.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { CriarContaModule } from './criar-conta/criar-conta.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    CoreModule,
    FornecedoresModule,
    EntradaDeMedicamentosModule,
    CategoriasDeMedicamentoModule,
    TiposDeMedicamentosModule,
    MedicosModule,
    PacientesModule,
    EntradaDeCorrelatosModule,
    CategoriaCorrelatoModule,
    TiposDeCorrelatosModule,
    SaidaDeMedicamentoModule,
    CentroDeCustoModule,
    SaidaMedicmentoCentroDeCustoModule,
    SaidaDeCorrelatoPorCentroDeCustoModule,
    SegurancaModule,
    DashboardModule,
    UsuarioModule,
    RelatoriosModule,
    CriarContaModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
