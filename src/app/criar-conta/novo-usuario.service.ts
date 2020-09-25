import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from '../core/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiUrl}/cadastrar`
   }

  cadastrar(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Basic YWRtaW5AZ21haWwuY29tOmFkbWlu');


    return this.http.post<Usuario>(
      `${this.usuariosUrl}`, usuario , {headers})
      .toPromise();

  }
}
