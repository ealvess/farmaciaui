import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { SaidaDeMedicamentoPorCentroDeCusto } from '../core/model';
import { environment } from 'src/environments/environment';

export class SaidaDeMedicamentoPorCentroDeCustoFiltro {
  centroDeCusto: string;
  dataSaidaDe: Date;
  dataSaidaAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CadastrarSaidaCentroDeCustoService {

  saidaMedicamentoPorCentroDeCustoUrl: string;

  constructor(private http: HttpClient) { 
    this.saidaMedicamentoPorCentroDeCustoUrl = `${environment.apiUrl}/saidamedicamentoscentrodecusto`
  }

  pesquisar(filtro: SaidaDeMedicamentoPorCentroDeCustoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.centroDeCusto) {
      params = params.set('centroDeCusto', filtro.centroDeCusto);
    }

    if (filtro.dataSaidaDe) {
      params = params.set('dataSaidaDe', moment(filtro.dataSaidaDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataSaidaAte) {
      params = params.set('dataSaidaAte', moment(filtro.dataSaidaAte).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.saidaMedicamentoPorCentroDeCustoUrl}`, { params })
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

  salvar(saida: SaidaDeMedicamentoPorCentroDeCusto): Promise<SaidaDeMedicamentoPorCentroDeCusto> {

    return this.http.post<SaidaDeMedicamentoPorCentroDeCusto>(
      this.saidaMedicamentoPorCentroDeCustoUrl, saida)
      .toPromise();

  }
}
