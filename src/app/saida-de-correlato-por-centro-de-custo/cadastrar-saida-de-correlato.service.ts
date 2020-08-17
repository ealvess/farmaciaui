import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { SaidaDeCorrelato } from '../core/model';
import { environment } from 'src/environments/environment';

export class SaidaDeCorrelatoFiltro {
  nomecorrelato: string;
  dataSaidaDe: Date;
  dataSaidaAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CadastrarSaidaDeCorrelatoService {

  saidaCorrelatoUrl: string;

  constructor(private http: HttpClient) { 
    this.saidaCorrelatoUrl = `${environment.apiUrl}/saidacorrelato`
  }

  pesquisar(filtro: SaidaDeCorrelatoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nomecorrelato) {
      params = params.set('nomecorrelato', filtro.nomecorrelato);
    }

    if (filtro.dataSaidaDe) {
      params = params.set('dataSaidaDe', moment(filtro.dataSaidaDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataSaidaAte) {
      params = params.set('dataSaidaAte', moment(filtro.dataSaidaAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.saidaCorrelatoUrl}`, { params })
      .toPromise()
      .then(response => {
        const correlatos = response['content']
        const resultado = {
          correlatos,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  salvar(saida: SaidaDeCorrelato): Promise<SaidaDeCorrelato> {
    return this.http.post<SaidaDeCorrelato>(
      this.saidaCorrelatoUrl, saida)
      .toPromise();

  }
}
