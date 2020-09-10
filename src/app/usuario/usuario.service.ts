import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from '../core/model';
import { environment } from 'src/environments/environment';

export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5; 
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`
   }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.usuariosUrl}`, { params })
      .toPromise()
      .then(response => {
        const usuarios = response['content']
        const resultado = {
          usuarios,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarPermissoes(){
    return this.http.get<any>(`${this.usuariosUrl}/permissao`)
    .toPromise()
    .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  salvar(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(
      this.usuariosUrl, usuario)
      .toPromise();

  }

  atualizar(usuario: Usuario): Promise<any> {
    return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.codigo}`, usuario)
      .toPromise()
      .then(response => {
        const usuarioAlterado = response;

        return usuarioAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Usuario>{
    return this.http.get<Usuario>(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const usuario = response
        return usuario;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${this.usuariosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }


}
