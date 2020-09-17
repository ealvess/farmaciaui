import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { MessageService } from 'primeng/api';

import { Usuario } from 'src/app/core/model';
import { UsuarioService } from '../usuario.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';



@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

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
  atendente :[
    
  ];

  constructor(
    private usuarioService: UsuarioService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoUsuario = this.route.snapshot.params['codigo'];
    if (codigoUsuario) {
      this.carregarUsuario(codigoUsuario);
    }

    this.title.setTitle('Novo Usuário');
    this.listarPermssao();
  }

  get editando() {
    return Boolean(this.usuario.codigo)
  }

  carregarUsuario(codigo: number) {
    this.usuarioService.buscaPorCodigo(codigo)
      .then(usuario => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();

      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  listarPermssao(){
    return this.usuarioService.listarPermissoes()
      .then(medicamentos => {
        this.permissoes = medicamentos.map(med =>  
          ({ codigo: med.codigo })); 
          console.log('permissoes', this.permissoes);         
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  verificarTipoUsuario(usuario:any){
    if(this.usuario.tipo === 'farmaceutico'){
      this.usuario.permissoes = this.permissoes;
    }
   
    if(this.usuario.tipo === 'atendente'){
      console.log('ate', this.atendente);
      
      this.usuario.permissoes = [
        {codigo:3},{codigo:6},{codigo:9},{codigo:12},{codigo:15},{codigo:16},{codigo:17},
        {codigo:18},{codigo:19},{codigo:22},{codigo:25},{codigo:28},{codigo:31},{codigo:34}
      ];
    }
    return usuario;
  }

  adicionarUsuario(form: FormControl) {
    this.verificarTipoUsuario(form);
    console.log('permissoes', this.usuario.permissoes);
    console.log('usuer',this.usuario);
    this.usuarioService.salvar(this.usuario)
    
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuario cadastrado com sucesso!' });

        this.router.navigate(['/usuario']);
      })
      .catch(erro => this.errorHandler.handle(erro))

  }

  atualizar(form: FormControl) {
    this.usuarioService.atualizar(this.usuario)
      .then(usuario => {
        this.usuario = usuario;
        this.messageService.add({ severity: 'success', detail: 'Usuario atualizado com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.usuario = new Usuario();
    }.bind(this), 1);

    this.router.navigate(['/usuario/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuario: ${this.usuario.nome}`);
  }

  generatePDF(form: FormControl) {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('farmacia.pdf');
    });

    form.markAsUntouched();
  }
}
