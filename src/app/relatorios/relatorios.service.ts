import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  entradaMedicamentoUrl: string;
  entradaCorrelatoUrl: string;

  constructor(private http: HttpClient) {
    this.entradaMedicamentoUrl = `${environment.apiUrl}/entradamedicamentos`;
    this.entradaCorrelatoUrl = `${environment.apiUrl}/entradacorrelatos`;

  }

  entradasDeMedicamentoPorMes(inicio: Date, fim: Date) {
    let params = new HttpParams();

    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim', moment(fim).format('YYYY-MM-DD'));
    

    return this.http.get(`${this.entradaMedicamentoUrl}/relatorios/por-mes`,
    { params, responseType: 'blob' })
    .toPromise()
    .then(response => response);

  }

  entradasDeCorrelatosPorMes(inicio: Date, fim: Date) {
    let params = new HttpParams();

    params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.set('fim', moment(fim).format('YYYY-MM-DD'));
    
    return this.http.get(`${this.entradaCorrelatoUrl}/relatorios/por-mes`,
    { params, responseType: 'blob' })
    .toPromise()
    .then(response => response);
  }

}
