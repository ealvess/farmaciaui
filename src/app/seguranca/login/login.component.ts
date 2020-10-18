import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
    ) {
      this.title.setTitle("Farmácia - Login")
     }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
    .then(() =>{
      this.router.navigate(['/dashboard'])
    })
    .catch(erro =>{
      this.errorHandler.handle(erro);
    });
    
  }

  //usuário especifico para criação de auto-cadastro
  //usado apenas para apresentação do TCC, retirar depois,
  //visto que não haverá auto-cadastro, sendo estq criado apenas para
  //atender aos requisitos obrigatórios
  user = 'admin@gmail.com';
  senha = 'admin';

  chamarLogin(){
    this.auth.login(this.user, this.senha);
  }

}
