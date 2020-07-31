import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Medico } from '../core/model';

export class MedicoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  medicosUrl = 'http://localhost:8080/medicos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: MedicoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.medicosUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const medicos = response['content']
        const resultado = {
          medicos,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarTodos() {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<any>(`${this.medicosUrl}/listar`, { headers })
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.delete(`${this.medicosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  salvar(medico: Medico): Promise<Medico> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.post<Medico>(
      this.medicosUrl, medico, { headers })
      .toPromise();

  }

  atualizar(medico: Medico): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.put<Medico>(`${this.medicosUrl}/${medico.codigo}`, medico, { headers })
      .toPromise()
      .then(response => {
        const medicoAlterado = response;
        this.converterStringsParaDatas([medicoAlterado]);
        return medicoAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Medico> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<Medico>(`${this.medicosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const medico = response
        this.converterStringsParaDatas([medico]);
        return medico;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu')
      .set('Content-Type', 'application/json');

    return this.http.put(`${this.medicosUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(medicos: Medico[]) {
    for (const medico of medicos) {
      medico.dataInscricao = moment(medico.dataInscricao,
        'YYYY-MM-DD').toDate();
    }
  }
}