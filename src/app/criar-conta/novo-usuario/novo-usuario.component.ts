import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NovoUsuarioService } from '../novo-usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  usuario = new Usuario();

  tipoUsuario = [
    { label: 'Farmacêutico', value: 'farmaceutico' },
    { label: 'Atendente', value: 'atendente' }
  ]

  status = [
    { label: 'Selecione', value: null },
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false },
  ]

  permissoes = [];
  atendente :[];

  constructor(
    private novoUsuarioService: NovoUsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastrar');
    
  }

  verificarTipoUsuario(usuario:any){
    if(this.usuario.tipo === 'farmaceutico'){
      this.usuario.permissoes = [
        {codigo:1},{codigo:2},{codigo:3},{codigo:4},{codigo:5},{codigo:6},{codigo:7},
        {codigo:8},{codigo:9},{codigo:10},{codigo:11},{codigo:12},{codigo:13},{codigo:14},
        {codigo:15},{codigo:16},{codigo:17},{codigo:18},{codigo:19},{codigo:20},{codigo:21},
        {codigo:22},{codigo:23},{codigo:24},{codigo:25},{codigo:26},{codigo:27},{codigo:28},
        {codigo:29},{codigo:30},{codigo:31},{codigo:32},{codigo:33},{codigo:34},{codigo:35},
        {codigo:36},{codigo:37},{codigo:38}
      ];
    }
   
    if(this.usuario.tipo === 'atendente'){    
      this.usuario.permissoes = [
        {codigo:3},{codigo:6},{codigo:9},{codigo:12},{codigo:15},{codigo:16},{codigo:17},
        {codigo:18},{codigo:19},{codigo:22},{codigo:25},{codigo:28},{codigo:31},{codigo:34}
  
      ];
    }
    
    return usuario;
  }

  salvar(form: FormControl) {
    this.verificarTipoUsuario(form);
    console.log('aqui', this.usuario);
    
    this.novoUsuarioService.cadastrar(this.usuario)
    
      .then(() => {
        console.log('passou');
        
        this.messageService.add({ severity: 'success', detail: 'Cadastro realizado com sucesso!' });

        
      })
      .catch(erro => this.errorHandler.handle(erro))

  }   /*
  */
}
