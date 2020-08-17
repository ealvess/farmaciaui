import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { SaidaDeMedicamento } from '../core/model';
import { environment } from 'src/environments/environment';

export class SaidaDeMedicamentoFiltro {
  nomepaciente: string;
  dataSaidaDe: Date;
  dataSaidaAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}
 

@Injectable({
  providedIn: 'root'
})
export class SaidaDeMedicamentoService {

  saidaMedicamentoUrl: string;

  constructor(private http: HttpClient) { 
    this.saidaMedicamentoUrl = `${environment.apiUrl}/saidamedicamentos`
  }

  pesquisar(filtro: SaidaDeMedicamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nomepaciente) {
      params = params.set('nomepaciente', filtro.nomepaciente);
    }

    if (filtro.dataSaidaDe) {
      params = params.set('dataSaidaDe', moment(filtro.dataSaidaDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataSaidaAte) {
      params = params.set('dataSaidaAte', moment(filtro.dataSaidaAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.saidaMedicamentoUrl}`, { params })
      .toPromise()
      .then(response => {
        const medicamentos = response['content']
        const resultado = {
          medicamentos,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  salvar(saida: SaidaDeMedicamento): Promise<SaidaDeMedicamento> {
    return this.http.post<SaidaDeMedicamento>(
      this.saidaMedicamentoUrl, saida)
      .toPromise();

  }
}
