import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Fornecedor } from '../core/model';

export class fornecedorFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  fornecedoresUrl = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: fornecedorFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.fornecedoresUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const fornecedores = response['content']
        const resultado = {
          fornecedores,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarTodos(){
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get(`${this.fornecedoresUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const fornecedores = response['content']
        const resultado = {
          fornecedores,
          total: response['totalElements']
        }        
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.delete(`${this.fornecedoresUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  salvar(fornecedor: Fornecedor): Promise<Fornecedor> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.post<Fornecedor>(
      this.fornecedoresUrl, fornecedor, { headers })
      .toPromise();

  }

  atualizar(fornecedor: Fornecedor): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.put<Fornecedor>(`${this.fornecedoresUrl}/${fornecedor.codigo}`, fornecedor, { headers })
      .toPromise()
      .then(response => {
        const fornecedorAlterado = response;

        return fornecedorAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Fornecedor>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<Fornecedor>(`${this.fornecedoresUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const fornecedor = response
        return fornecedor;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu')
    .set('Content-Type', 'application/json');

    return this.http.put(`${this.fornecedoresUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }
}
