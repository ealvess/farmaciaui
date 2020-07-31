import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { CategoriaCorrelato } from '../core/model';

export class CategoriaCorrelatoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaCorrelatoService {

  categoriasUrl = 'http://localhost:8080/categoriascorrelato';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: CategoriaCorrelatoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.categoriasUrl}`, { headers, params })
      .toPromise()
      .then(response => {
        const categorias = response['content']
        const resultado = {
          categorias,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarTodas(){
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<any>(`${this.categoriasUrl}/listar`, { headers })
      .toPromise()
      .then(response => response);
  }

  salvar(categoria: CategoriaCorrelato): Promise<CategoriaCorrelato> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.post<CategoriaCorrelato>(this.categoriasUrl, categoria, { headers })
      .toPromise();

  }

  atualizar(categoria: CategoriaCorrelato): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.put<CategoriaCorrelato>(`${this.categoriasUrl}/${categoria.codigo}`, 
    categoria, { headers })
      .toPromise()
      .then(response => {
        const categoriaAlterada = response;

        return categoriaAlterada;
      });
  }


  buscaPorCodigo(codigo: number): Promise<CategoriaCorrelato> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<CategoriaCorrelato>(`${this.categoriasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const categoria = response
        return categoria;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu')
      .set('Content-Type', 'application/json');

    return this.http.put(`${this.categoriasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.delete(`${this.categoriasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }
}