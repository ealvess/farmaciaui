import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Correlato } from '../core/model';
import { environment } from 'src/environments/environment';

export class TiposDeCorrelatoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class TiposCorrelatosService {

  tiposCorrelatosUrl: string;

  constructor(private http: HttpClient) {
    this.tiposCorrelatosUrl = `${environment.apiUrl}/correlatos`
   }

  pesquisar(filtro: TiposDeCorrelatoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.tiposCorrelatosUrl}`, { params })
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

  listarTodos() {
    return this.http.get<any>(`${this.tiposCorrelatosUrl}/listar`)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.tiposCorrelatosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  salvar(correlato: Correlato): Promise<Correlato> {
    return this.http.post<Correlato>(
      this.tiposCorrelatosUrl, correlato)
      .toPromise();

  }

  atualizar(correlato: Correlato): Promise<any> {
    return this.http.put<Correlato>(`${this.tiposCorrelatosUrl}/${correlato.codigo}`,
      correlato)
      .toPromise()
      .then(response => {
        const correlatoAlterado = response;

        return correlatoAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Correlato> {
    return this.http.get<Correlato>(`${this.tiposCorrelatosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const correlato = response
        return correlato;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${this.tiposCorrelatosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }


}
