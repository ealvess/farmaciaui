import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { MessageService } from 'primeng/api';

import { FornecedorService } from '../fornecedor.service';
import { Fornecedor } from '../../core/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.css']
})
export class CadastroFornecedorComponent implements OnInit {

  status = [
    {label:'Selecione', value:null},
    {label:'Ativo', value:true},
    {label:'Inativo', value:false},
  ]
  fornecedor = new Fornecedor();

  constructor(
    private fornecedorService: FornecedorService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoFornecedor = this.route.snapshot.params['codigo'];
    if(codigoFornecedor){
      this.carregarFornecedor(codigoFornecedor);
    }

    this.title.setTitle('Novo Fornecedor')
  }

  get editando(){
    return Boolean(this.fornecedor.codigo)
  }

  carregarFornecedor(codigo: number){
    this.fornecedorService.buscaPorCodigo(codigo)
    .then(fornecedor => {
      this.fornecedor = fornecedor;
      this.atualizarTituloEdicao();
      
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizar(form);
    } else{
      this.adicionarFornecedor(form);
    }
  }

  adicionarFornecedor(form: FormControl){
    this.fornecedorService.salvar(this.fornecedor)
    .then(() => {
      this.messageService.add({ severity:'success', detail:'Fornecedor cadastrado com sucesso!'});

      //form.reset();
      //this.fornecedor = new Fornecedor();
      this.router.navigate(['/fornecedores']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.fornecedorService.atualizar(this.fornecedor)
    .then(fornecedor => {
      this.fornecedor = fornecedor;
      this.messageService.add({ severity:'success', detail:'Fornecedor atualizado com sucesso!'});
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.fornecedor = new Fornecedor();
    }.bind(this), 1);

    this.router.navigate(['/fornecedores/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de fornecedores: ${this.fornecedor.nomeFantasia}`)
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
