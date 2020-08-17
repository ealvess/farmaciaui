import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
    .then(() =>{
      this.router.navigate(['/entradamedicamentos'])
    })
    .catch(erro =>{
      this.errorHandler.handle(erro);
    });
    
  }

}
