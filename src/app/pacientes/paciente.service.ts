import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { Paciente } from '../core/model';
import { environment } from 'src/environments/environment';

export class PacienteFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteUrl: string;

  constructor(private http: HttpClient) {
    this.pacienteUrl = `${environment.apiUrl}/pacientes`
   }

  pesquisar(filtro: PacienteFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pacienteUrl}?resumo`, { params })
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
    return this.http.get<any>(`${this.pacienteUrl}/listar`)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pacienteUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  salvar(paciente: Paciente): Promise<Paciente> {
    return this.http.post<Paciente>(
      this.pacienteUrl, paciente)
      .toPromise();

  }

  atualizar(paciente: Paciente): Promise<any> {
    return this.http.put<Paciente>(`${this.pacienteUrl}/${paciente.codigo}`,
      paciente)
      .toPromise()
      .then(response => {
        const pacienteAlterado = response;
        this.converterStringsParaDatas([pacienteAlterado]);
        return pacienteAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Paciente> {
    return this.http.get<Paciente>(`${this.pacienteUrl}/${codigo}`)
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