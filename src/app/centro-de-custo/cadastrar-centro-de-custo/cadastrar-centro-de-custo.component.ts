import { Component, OnInit, Input } from '@angular/core';
import { CentroDeCusto } from 'src/app/core/model';
import { CentroDeCustoService } from '../centro-de-custo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-centro-de-custo',
  templateUrl: './cadastrar-centro-de-custo.component.html',
  styleUrls: ['./cadastrar-centro-de-custo.component.css']
})
export class CadastrarCentroDeCustoComponent implements OnInit {

  status = [
    {label:'Ativo', value:true},
    {label:'Inativo', value:false},
  ]
  centroDeCusto = new CentroDeCusto();

  @Input() codigoCentroDeCusto: number;

  constructor(
    private centroDeCustoService: CentroDeCustoService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.codigoCentroDeCusto = this.route.snapshot.params['codigo'];
    if(this.codigoCentroDeCusto){
      this.carregarCentroDeCusto(this.codigoCentroDeCusto);
    }

    this.title.setTitle('Novo Centro de Custo')
  }

  get editando(){
    return Boolean(this.centroDeCusto.codigo)
  }

  carregarCentroDeCusto(codigo: number){
    this.centroDeCustoService.buscaPorCodigo(codigo)
    .then(centro => {
      this.centroDeCusto = centro;
      this.atualizarTituloEdicao();
      
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizar(form);
    } else{
      this.adicionarCentroDeCusto(form);
    }
  }

  adicionarCentroDeCusto(form: FormControl){
    this.centroDeCustoService.salvar(this.centroDeCusto)
    .then(() => {
      this.toasty.success('Centro de Custo cadastrado com sucesso!');

      this.router.navigate(['/centrodecusto']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.centroDeCustoService.atualizar(this.centroDeCusto)
    .then(centro => {
      this.centroDeCusto = centro;
      this.toasty.success('Centro de Custo atualizado com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.centroDeCusto = new CentroDeCusto();
    }.bind(this), 1);

    this.router.navigate(['/centrodecusto/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Centro de Custo: ${this.centroDeCusto.nome}`)
  }
}
