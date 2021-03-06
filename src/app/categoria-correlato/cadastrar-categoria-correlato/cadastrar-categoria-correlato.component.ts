import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import {MessageService} from 'primeng/api';

import { CategoriaCorrelatoService } from '../categoria-correlato.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaCorrelato } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-cadastrar-categoria-correlato',
  templateUrl: './cadastrar-categoria-correlato.component.html',
  styleUrls: ['./cadastrar-categoria-correlato.component.css']
})
export class CadastrarCategoriaCorrelatoComponent implements OnInit {

  status = [
    {label:'Ativo', value:true},
    {label:'Inativo', value:false},
  ]
  categoria = new CategoriaCorrelato();

  @Input() codigoCategoria: number;

  constructor(
    private categoriaService: CategoriaCorrelatoService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.codigoCategoria = this.route.snapshot.params['codigo'];
    if(this.codigoCategoria){
      this.carregarCategoria(this.codigoCategoria);
    }

    this.title.setTitle('Nova Categoria')
  }

  get editando(){
    return Boolean(this.categoria.codigo)
  }

  carregarCategoria(codigo: number){
    this.categoriaService.buscaPorCodigo(codigo)
    .then(categoria => {
      this.categoria = categoria;
      this.atualizarTituloEdicao();
      
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizar(form);
    } else{
      this.adicionarCategoria(form);
    }
  }

  adicionarCategoria(form: FormControl){
    this.categoriaService.salvar(this.categoria)
    .then(() => {
      this.messageService.add({ severity:'success', detail:'Categoria cadastrada com sucesso!' });

      this.router.navigate(['/categoriascorrelato']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.categoriaService.atualizar(this.categoria)
    .then(categoria => {
      this.categoria = categoria;
      this.messageService.add({ severity:'success', detail:'Categoria atualizada com sucesso!' });
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.categoria = new CategoriaCorrelato();
    }.bind(this), 1);

    this.router.navigate(['/categoriascorrelato/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de categoria: ${this.categoria.nome}`)
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
