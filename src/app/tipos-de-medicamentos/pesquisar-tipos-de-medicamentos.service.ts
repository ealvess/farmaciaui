import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Medicamento } from '../core/model';

export class TiposDeMedicamentoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5; 
}

@Injectable({
  providedIn: 'root'
})
export class TiposDeMedicamentosService {

  medicamentosUrl = 'http://localhost:8080/medicamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: TiposDeMedicamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.medicamentosUrl}`, { headers, params })
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
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<any>(`${this.medicamentosUrl}/listar`, { headers })
    .toPromise()
    .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.delete(`${this.medicamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  salvar(medicamento: Medicamento): Promise<Medicamento> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.post<Medicamento>(
      this.medicamentosUrl, medicamento, { headers })
      .toPromise();

  }

  atualizar(medicamento: Medicamento): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.put<Medicamento>(`${this.medicamentosUrl}/${medicamento.codigo}`, medicamento, { headers })
      .toPromise()
      .then(response => {
        const medicamentoAlterado = response;

        return medicamentoAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Medicamento>{
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<Medicamento>(`${this.medicamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const medicamento = response
        return medicamento;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
    .set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu')
    .set('Content-Type', 'application/json');

    return this.http.put(`${this.medicamentosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }


}
