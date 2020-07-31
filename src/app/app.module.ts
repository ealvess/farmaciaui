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
        
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
