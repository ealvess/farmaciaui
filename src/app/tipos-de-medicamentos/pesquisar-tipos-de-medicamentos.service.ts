import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Medicamento } from '../core/model';
import { environment } from 'src/environments/environment';

export class TiposDeMedicamentoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5; 
}

@Injectable({
  providedIn: 'root'
})
export class TiposDeMedicamentosService {

  medicamentosUrl: string;

  constructor(private http: HttpClient) {
    this.medicamentosUrl = `${environment.apiUrl}/medicamentos`
   }

  pesquisar(filtro: TiposDeMedicamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.medicamentosUrl}`, { params })
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

  listarTodos(){
    return this.http.get<any>(`${this.medicamentosUrl}/listar`)
    .toPromise()
    .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.medicamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  salvar(medicamento: Medicamento): Promise<Medicamento> {
    return this.http.post<Medicamento>(
      this.medicamentosUrl, medicamento)
      .toPromise();

  }

  atualizar(medicamento: Medicamento): Promise<any> {
    return this.http.put<Medicamento>(`${this.medicamentosUrl}/${medicamento.codigo}`, medicamento)
      .toPromise()
      .then(response => {
        const medicamentoAlterado = response;

        return medicamentoAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Medicamento>{
    return this.http.get<Medicamento>(`${this.medicamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const medicamento = response
        return medicamento;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put(`${this.medicamentosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }


}
