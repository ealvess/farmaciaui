import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Fornecedor } from '../core/model';
import { environment } from 'src/environments/environment';

export class fornecedorFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  fornecedoresUrl: string;

  constructor(private http: HttpClient) { 
    this.fornecedoresUrl = `${environment.apiUrl}/fornecedores`
  }

  pesquisar(filtro: fornecedorFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.fornecedoresUrl}?resumo`, { params })
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

  listarTodos() {
    return this.http.get(`${this.fornecedoresUrl}?resumo`)
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
    return this.http.delete(`${this.fornecedoresUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  salvar(fornecedor: Fornecedor): Promise<Fornecedor> {
    return this.http.post<Fornecedor>(
      this.fornecedoresUrl, fornecedor)
      .toPromise();

  }

  atualizar(fornecedor: Fornecedor): Promise<any> {
    return this.http.put<Fornecedor>(`${this.fornecedoresUrl}/${fornecedor.codigo}`, fornecedor)
      .toPromise()
      .then(response => {
        const fornecedorAlterado = response;

        return fornecedorAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.fornecedoresUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const fornecedor = response
        return fornecedor;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${this.fornecedoresUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }
}
