import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Medico } from '../core/model';
import { environment } from 'src/environments/environment';

export class MedicoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  medicosUrl: string;

  constructor(private http: HttpClient) { 
    this.medicosUrl = `${environment.apiUrl}/medicos`
  }

  pesquisar(filtro: MedicoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.medicosUrl}?resumo`, { params })
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
    return this.http.get<any>(`${this.medicosUrl}/listar`)
      .toPromise()
      .then(response => response);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.medicosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  salvar(medico: Medico): Promise<Medico> {
    return this.http.post<Medico>(
      this.medicosUrl, medico)
      .toPromise();

  }

  atualizar(medico: Medico): Promise<any> {
    return this.http.put<Medico>(`${this.medicosUrl}/${medico.codigo}`, medico)
      .toPromise()
      .then(response => {
        const medicoAlterado = response;
        this.converterStringsParaDatas([medicoAlterado]);
        return medicoAlterado;
      });
  }

  buscaPorCodigo(codigo: number): Promise<Medico> {
    return this.http.get<Medico>(`${this.medicosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const medico = response
        this.converterStringsParaDatas([medico]);
        return medico;
      });
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
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