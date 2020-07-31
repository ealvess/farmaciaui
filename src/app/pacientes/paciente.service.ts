import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';

import { Medico, Paciente } from '../core/model';

export class PacienteFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteUrl = 'http://localhost:8080/pacientes';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PacienteFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pacienteUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const pacientes = response['content']
        const resultado = {
          pacientes,
          total: response['totalElements']
        }
        return resultado;
      });
  }

  listarTodos() {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<any>(`${this.pacienteUrl}/listar`, { headers })
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.delete(`${this.pacienteUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  salvar(paciente: Paciente): Promise<Paciente> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.post<Paciente>(
      this.pacienteUrl, paciente, { headers })
      .toPromise();

  }

  atualizar(paciente: Paciente): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.put<Paciente>(`${this.pacienteUrl}/${paciente.codigo}`, 
    paciente, { headers })
      .toPromise()
      .then(response => {
        const pacienteAlterado = response;
        this.converterStringsParaDatas([pacienteAlterado]);
        return pacienteAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Paciente> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');
    let params = new HttpParams();

    return this.http.get<Paciente>(`${this.pacienteUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const paciente = response
        this.converterStringsParaDatas([paciente]);
        return paciente;
      });
  }

  private converterStringsParaDatas(pacientes: Paciente[]) {
    for (const paciente of pacientes) {
      paciente.dataNascimento = moment(paciente.dataNascimento,
        'YYYY-MM-DD').toDate();
    }
  }
}