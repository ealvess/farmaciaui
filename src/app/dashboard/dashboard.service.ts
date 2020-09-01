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

  constructor(private http: HttpClient) {
    this.entradaMedicamentoUrl = `${environment.apiUrl}/entradamedicamentos`;
    this.entradaCorrelatoUrl = `${environment.apiUrl}/entradacorrelatos`;
  }

  EntradasDeMedicamentoPorMedicamento(): Promise<Array<any>> {
    return this.http.get(`${this.entradaMedicamentoUrl}/estatisticas/por-medicamento`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  EntradasDeMedicamentoPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.entradaMedicamentoUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  EntradasDeCorrelatoPorMes(): Promise<Array<any>> {
    return this.http.get(`${this.entradaCorrelatoUrl}/estatisticas/por-mes`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
