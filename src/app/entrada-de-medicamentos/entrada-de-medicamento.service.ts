import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { EntradaMedicamento } from '../core/model';

export class EntradaDeMedicamentoFiltro {
  nome: string;
  dataValidadeInicio: Date;
  dataValidadeFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EntradaDeMedicamentoService {

  entradaMedicamentoUrl = 'http://localhost:8080/entradamedicamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: EntradaDeMedicamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.dataValidadeInicio) {
      params = params.set('dataValidadeDe', moment(filtro.dataValidadeInicio).format('YYYY-MM-DD'));
  }
  
  if (filtro.dataValidadeFim) {
      params = params.set('dataValidadeAte', moment(filtro.dataValidadeFim).format('YYYY-MM-DD'));
  }

    return this.http.get(`${this.entradaMedicamentoUrl}?resumo`, { headers, params })
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

  salvar(entradaMedicamento: EntradaMedicamento): Promise<EntradaMedicamento> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.post<EntradaMedicamento>(this.entradaMedicamentoUrl, entradaMedicamento, { headers })
      .toPromise();

  }

  atualizar(entradaMedicamento: EntradaMedicamento): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.put<EntradaMedicamento>(`${this.entradaMedicamentoUrl}/${entradaMedicamento.codigo}`, entradaMedicamento, { headers })
      .toPromise()
      .then(response => {
        const entradaAlterada = response;
        this.converterStringsParaDatas([entradaAlterada]);
        return entradaAlterada;
      });
  }


  buscaPorCodigo(codigo: number): Promise<EntradaMedicamento> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<EntradaMedicamento>(`${this.entradaMedicamentoUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const entrada = response;
        this.converterStringsParaDatas([entrada]);
        return entrada;
      });
  }

  private converterStringsParaDatas(entradas: EntradaMedicamento[]) {
    for (const entrada of entradas) {
      entrada.dataEntrada = moment(entrada.dataEntrada,
        'YYYY-MM-DD').toDate();

      if (entrada.dataFabricacao) {
        entrada.dataFabricacao = moment(entrada.dataFabricacao,
          'YYYY-MM-DD').toDate();
      }
      if (entrada.validade) {
        entrada.validade = moment(entrada.validade,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
