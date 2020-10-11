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
    this.usuariosUrl = `http://localhost:8080/cadastrar`
   }

  cadastrar(usuario: Usuario): Promise<Usuario> {
       return this.http.post<Usuario>(
      `${this.usuariosUrl}`, usuario)
      .toPromise();

  }
}
