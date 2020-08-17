import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { EntradaCorrelato } from '../core/model';
import { environment } from 'src/environments/environment';

export class EntradaDeCorrelatoFiltro {
  nome: string;
  dataValidadeInicio: Date;
  dataValidadeFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EntradaCorrelatosService {

  entradaCorrelatoUrl: string;

  constructor(private http: HttpClient) { 
    this.entradaCorrelatoUrl = `${environment.apiUrl}/entradacorrelatos`
  }

  pesquisar(filtro: EntradaDeCorrelatoFiltro): Promise<any> {
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

    return this.http.get(`${this.entradaCorrelatoUrl}?resumo`, { params })
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

  salvar(entradaCorrelato: EntradaCorrelato): Promise<EntradaCorrelato> {
    return this.http.post<EntradaCorrelato>(this.entradaCorrelatoUrl,
      entradaCorrelato)
      .toPromise();

  }

  atualizar(entradaCorrelato: EntradaCorrelato): Promise<any> {
    return this.http.put<EntradaCorrelato>(`${this.entradaCorrelatoUrl}/${entradaCorrelato.codigo}`,
      entradaCorrelato)
      .toPromise()
      .then(response => {
        const entradaAlterada = response;
        this.converterStringsParaDatas([entradaAlterada]);
        return entradaAlterada;
      });
  }

  listarTodos() {
    return this.http.get<any>(`${this.entradaCorrelatoUrl}/listar`)
      .toPromise()
      .then(response => response);
  }


  buscaPorCodigo(codigo: number): Promise<EntradaCorrelato> {
    return this.http.get<EntradaCorrelato>(`${this.entradaCorrelatoUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const entrada = response;
        this.converterStringsParaDatas([entrada]);
        return entrada;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.entradaCorrelatoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(entradas: EntradaCorrelato[]) {
    for (const entrada of entradas) {
      entrada.dataEntrada = moment(entrada.dataEntrada,
        'YYYY-MM-DD').toDate();

      if (entrada.dataFabricacao) {
        entrada.dataFabricacao = moment(entrada.dataFabricacao,
          'YYYY-MM-DD').toDate();
      }
      if (entrada.dataValidade) {
        entrada.dataValidade = moment(entrada.dataValidade,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
