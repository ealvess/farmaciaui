import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { EntradaMedicamento } from '../core/model';
import { environment } from 'src/environments/environment';

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

  entradaMedicamentoUrl: string;

  constructor(private http: HttpClient) { 
    this.entradaMedicamentoUrl = `${environment.apiUrl}/entradamedicamentos`
  }

  pesquisar(filtro: EntradaDeMedicamentoFiltro): Promise<any> {
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

    return this.http.get(`${this.entradaMedicamentoUrl}?resumo`, { params })
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
    return this.http.post<EntradaMedicamento>(this.entradaMedicamentoUrl, entradaMedicamento)
      .toPromise();

  }

  atualizar(entradaMedicamento: EntradaMedicamento): Promise<any> {
    return this.http.put<EntradaMedicamento>(`${this.entradaMedicamentoUrl}/${entradaMedicamento.codigo}`, entradaMedicamento)
      .toPromise()
      .then(response => {
        const entradaAlterada = response;
        this.converterStringsParaDatas([entradaAlterada]);
        return entradaAlterada;
      });
  }

  listarTodas() {
    return this.http.get<any>(`${this.entradaMedicamentoUrl}/listar`)
      .toPromise()
      .then(response => response);
  }


  buscaPorCodigo(codigo: number): Promise<EntradaMedicamento> {
    return this.http.get<EntradaMedicamento>(`${this.entradaMedicamentoUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const entrada = response;
        this.converterStringsParaDatas([entrada]);
        return entrada;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.entradaMedicamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
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
