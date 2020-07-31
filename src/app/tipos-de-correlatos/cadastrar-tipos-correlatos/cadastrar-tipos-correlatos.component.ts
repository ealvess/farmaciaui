import { Component, OnInit } from '@angular/core';
import { Correlato } from 'src/app/core/model';
import { CategoriaCorrelatoService } from 'src/app/categoria-correlato/categoria-correlato.service';
import { TiposCorrelatosService } from '../tipos-correlatos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-tipos-correlatos',
  templateUrl: './cadastrar-tipos-correlatos.component.html',
  styleUrls: ['./cadastrar-tipos-correlatos.component.css']
})
export class CadastrarTiposCorrelatosComponent implements OnInit {

  categorias = [];
  totalRegistros = 0;
  correlato = new Correlato();

  apresentacao = [
    {label:'UNIDADE' , value:'UNIDADE'},
    {label:'PAR' , value:'PAR'},
    {label:'CAIXA' , value:'CAIXA'},
    {label:'LITRO' , value:'LITRO'},
    {label:'FRASCO' , value:'FRASCO'},
    {label:'GALÃO' , value:'GALÃO'},
    {label:'ROLO' , value:'ROLO'},
    {label:'POTE' , value:'POTE'},
    {label:'ENVELOPE' , value:'ENVELOPE'},
    {label:'FRASCO GOTAS' , value:'FRASCO GOTAS'},
    {label:'AMPOLA' , value:'AMPOLA'},
    {label:'COMPRIMIDO' , value:'COMPRIMIDO'},
    {label:'BISNAGA' , value:'BISNAGA'},
    {label:'SPRAY' , value:'SPRAY'},
    {label:'FRASCO AMPOLA' , value:'FRASCO AMPOLA'},
  ]

  status = [
    {label: 'Ativo', value:true},
    {label: 'Inativo', value:false}
  ]

  constructor(
    private categoriaService: CategoriaCorrelatoService,
    private tiposCorrelatoService: TiposCorrelatosService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();

    const codigoCorrelato = this.route.snapshot.params['codigo'];
    if(codigoCorrelato){
      this.carregarTipoCorrelato(codigoCorrelato);
    }

    this.title.setTitle('Novo Tipo de Correlato')
  }

  carregarCategorias() { 
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(cat =>  
          ({ label: cat.nome, value: cat.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando(){
    return Boolean(this.correlato.codigo)
  }

  carregarTipoCorrelato(codigo: number){
    this.tiposCorrelatoService.buscaPorCodigo(codigo)
    .then(correlato => {
      this.correlato = correlato;
      this.atualizarTituloEdicao();
      
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizar(form);
    } else{
      this.adicionarTipoCorrelato(form);
    }
  }

  adicionarTipoCorrelato(form: FormControl){
    this.tiposCorrelatoService.salvar(this.correlato)
    .then(() => {
      this.toasty.success('Correlato cadastrado com sucesso!');

      this.router.navigate(['/tiposcorrelatos']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.tiposCorrelatoService.atualizar(this.correlato)
    .then(correlato => {
      this.correlato = correlato;
      this.toasty.success('Correlato atualizado com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.correlato = new Correlato();
    }.bind(this), 1);

    this.router.navigate(['/tiposcorrelatos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Correlato: ${this.correlato.nome}`)
  }


}
