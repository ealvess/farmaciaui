import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CentroDeCusto } from '../core/model';
import { environment } from 'src/environments/environment';

export class CentroDeCustoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CentroDeCustoService {

  centroDeCustoUrl: string;

  constructor(private http: HttpClient) { 
    this.centroDeCustoUrl = `${environment.apiUrl}/centrodecusto`
  }

  pesquisar(filtro: CentroDeCustoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.centroDeCustoUrl}`, { params })
      .toPromise()
      .then(response => {
        const centroDeCustos = response['content']
        const resultado = {
          centroDeCustos,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarTodas(){
    return this.http.get<any>(`${this.centroDeCustoUrl}/listar`)
      .toPromise()
      .then(response => response);
  }

  salvar(centro: CentroDeCusto): Promise<CentroDeCusto> {
    return this.http.post<CentroDeCusto>(this.centroDeCustoUrl, 
      centro)
      .toPromise();

  }

  atualizar(centro: CentroDeCusto): Promise<any> {
    return this.http.put<CentroDeCusto>(`${this.centroDeCustoUrl}/${centro.codigo}`,
     centro)
      .toPromise()
      .then(response => {
        const centroDeCustoAlterado = response;

        return centroDeCustoAlterado;
      });
  }


  buscaPorCodigo(codigo: number): Promise<CentroDeCusto> {
    return this.http.get<CentroDeCusto>(`${this.centroDeCustoUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const centro = response
        return centro;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${this.centroDeCustoUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.centroDeCustoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}