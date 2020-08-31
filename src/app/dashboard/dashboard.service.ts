import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  entradaUrl: string;

  constructor(private http: HttpClient) { 
    this.entradaUrl = `${environment.apiUrl}/entradamedicamentos`
  }

  EntradasDeMedicamentoPorMedicamento(): Promise<Array<any>> {
    return this.http.get(`${this.entradaUrl}/estatisticas/por-medicamento`)
      .toPromise()
      .then(response => response as Array<any>);
  }

  EntradasDeMedicamentoPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.entradaUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        console.log('dados', response);
        
        const dados = response['content'];
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
