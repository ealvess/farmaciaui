import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Correlato } from '../core/model';

export class TiposDeCorrelatoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5; 
}

@Injectable({
  providedIn: 'root'
})
export class TiposCorrelatosService {
 
  tiposCorrelatosUrl = 'http://localhost:8080/correlatos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: TiposDeCorrelatoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.tiposCorrelatosUrl}`, { headers, params })
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

  listarTodos(){
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<any>(`${this.tiposCorrelatosUrl}/listar`, { headers })
    .toPromise()
    .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.delete(`${this.tiposCorrelatosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  salvar(correlato: Correlato): Promise<Correlato> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.post<Correlato>(
      this.tiposCorrelatosUrl, correlato, { headers })
      .toPromise();

  }

  atualizar(correlato: Correlato): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.put<Correlato>(`${this.tiposCorrelatosUrl}/${correlato.codigo}`, 
    correlato, { headers })
      .toPromise()
      .then(response => {
        const correlatoAlterado = response;

        return correlatoAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Correlato>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<Correlato>(`${this.tiposCorrelatosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const correlato = response
        return correlato;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu')
    .set('Content-Type', 'application/json');

    return this.http.put(`${this.tiposCorrelatosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }


}
