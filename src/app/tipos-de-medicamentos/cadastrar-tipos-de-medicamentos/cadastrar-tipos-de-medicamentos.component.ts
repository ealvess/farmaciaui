import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/categorias-de-medicamento/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Medicamento } from 'src/app/core/model';
import { TiposDeMedicamentosService } from '../pesquisar-tipos-de-medicamentos.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-tipos-de-medicamentos',
  templateUrl: './cadastrar-tipos-de-medicamentos.component.html',
  styleUrls: ['./cadastrar-tipos-de-medicamentos.component.css']
})
export class CadastrarTiposDeMedicamentosComponent implements OnInit {

  categorias = [];
  totalRegistros = 0;
  medicamento = new Medicamento();

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
    private categoriaService: CategoriaService,
    private medicamentoService: TiposDeMedicamentosService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();

    const codigoMedicamento = this.route.snapshot.params['codigo'];
    if(codigoMedicamento){
      this.carregarMedicamento(codigoMedicamento);
    }

    this.title.setTitle('Novo Tipo de Medicamento')
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
    return Boolean(this.medicamento.codigo)
  }

  carregarMedicamento(codigo: number){
    this.medicamentoService.buscaPorCodigo(codigo)
    .then(medicamento => {
      this.medicamento = medicamento;
      this.atualizarTituloEdicao();
      
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizar(form);
    } else{
      this.adicionarMedicamento(form);
    }
  }

  adicionarMedicamento(form: FormControl){
    this.medicamentoService.salvar(this.medicamento)
    .then(() => {
      this.messageService.add({ severity:'success', detail:'Medicamento cadastrado com sucesso!'});

      this.router.navigate(['/tiposmedicamentos']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.medicamentoService.atualizar(this.medicamento)
    .then(medicamento => {
      this.medicamento = medicamento;
      this.messageService.add({ severity:'success', detail:'Medicamento atualizado com sucesso!'});
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.medicamento = new Medicamento();
    }.bind(this), 1);

    this.router.navigate(['/tiposmedicamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Medicamento: ${this.medicamento.nome}`)
  }


}
