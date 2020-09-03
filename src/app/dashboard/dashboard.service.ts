import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  entradaMedicamentoUrl: string;
  entradaCorrelatoUrl: string;
  saidaDeMedicamentoParaPacientes: string;
  saidaDeMedicamentoParaCentroDeCusto: string;
  saidaDeCorrelatosPorMes: string;

  constructor(private http: HttpClient) {
    this.entradaMedicamentoUrl = `${environment.apiUrl}/entradamedicamentos`;
    this.saidaDeMedicamentoParaPacientes = `${environment.apiUrl}/saidamedicamentos`;
    this.saidaDeMedicamentoParaCentroDeCusto = `${environment.apiUrl}/saidamedicamentoscentrodecusto`;
    this.entradaCorrelatoUrl = `${environment.apiUrl}/entradacorrelatos`;
    this.saidaDeCorrelatosPorMes = `${environment.apiUrl}/saidacorrelato`;
  }

  EntradasDeMedicamentoPorMes(): Promise<Array<any>> {
    return this.http.get(`${this.entradaMedicamentoUrl}/estatisticas/por-medicamento`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  SaidaDeMedicamentoPorMesParaPacientes(): Promise<Array<any>> {
    return this.http.get(`${this.saidaDeMedicamentoParaPacientes}/estatisticas/por-mes`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  SaidaDeMedicamentoPorMesParaCentroDeCusto(): Promise<Array<any>> {
    return this.http.get(`${this.saidaDeMedicamentoParaCentroDeCusto}/estatisticas/por-mes`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  EntradasDeCorrelatoPorMes(): Promise<Array<any>> {
    return this.http.get(`${this.entradaCorrelatoUrl}/estatisticas/por-mes`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  SaidaDeCorrelatoPorMes(): Promise<Array<any>> {
    return this.http.get(`${this.saidaDeCorrelatosPorMes}/estatisticas/por-mes`)
      .toPromise()
      .then(response => response as Array<any>);
  }
}
