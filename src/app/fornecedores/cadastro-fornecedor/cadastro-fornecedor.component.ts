import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { FornecedorService } from '../fornecedor.service';
import { Fornecedor } from '../../core/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private toasty: ToastyService,
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
      this.toasty.success('Fornecedor cadastrado com sucesso!');

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
      this.toasty.success('Fornecedor atualizado com sucesso!');
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

}
