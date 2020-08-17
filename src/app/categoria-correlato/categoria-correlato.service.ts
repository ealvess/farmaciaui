import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { CategoriaCorrelato } from '../core/model';
import { environment } from 'src/environments/environment';

export class CategoriaCorrelatoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaCorrelatoService {

  categoriasUrl : string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categoriascorrelato`
   }

  pesquisar(filtro: CategoriaCorrelatoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.categoriasUrl}`, { params })
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
    return this.http.get<any>(`${this.categoriasUrl}/listar`)
      .toPromise()
      .then(response => response);
  }

  salvar(categoria: CategoriaCorrelato): Promise<CategoriaCorrelato> {
    return this.http.post<CategoriaCorrelato>(this.categoriasUrl, categoria)
      .toPromise();

  }

  atualizar(categoria: CategoriaCorrelato): Promise<any> {
    return this.http.put<CategoriaCorrelato>(`${this.categoriasUrl}/${categoria.codigo}`, 
    categoria)
      .toPromise()
      .then(response => {
        const categoriaAlterada = response;

        return categoriaAlterada;
      });
  }


  buscaPorCodigo(codigo: number): Promise<CategoriaCorrelato> {
    return this.http.get<CategoriaCorrelato>(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const categoria = response
        return categoria;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${this.categoriasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}