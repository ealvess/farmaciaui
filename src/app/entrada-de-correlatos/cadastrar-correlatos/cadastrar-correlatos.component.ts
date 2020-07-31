import { Component, OnInit, Input } from '@angular/core';
import { EntradaCorrelato } from 'src/app/core/model';
import { FornecedorService } from 'src/app/fornecedores/fornecedor.service';
import { TiposCorrelatosService } from 'src/app/tipos-de-correlatos/tipos-correlatos.service';
import { EntradaCorrelatosService } from '../entrada-correlatos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-correlatos',
  templateUrl: './cadastrar-correlatos.component.html',
  styleUrls: ['./cadastrar-correlatos.component.css']
})
export class CadastrarCorrelatosComponent implements OnInit {
 
  pt: any;
  fornecedores = [];
  correlatos = [];

  entradaCorrelato = new EntradaCorrelato();

  @Input() codigoEntrada: number;

  constructor(
    private fornecedorService: FornecedorService,
    private correlatoService: TiposCorrelatosService,
    private entradaService: EntradaCorrelatosService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.localizacaoCalendar();
    this.carregarFornecedores();
    this.carregarCorrelatos();

    this.codigoEntrada = this.route.snapshot.params['codigo'];
    if(this.codigoEntrada){
      this.carregarEntrada(this.codigoEntrada);
    }

    this.title.setTitle('Nova Entrada de Correlato')
  }

  localizacaoCalendar() {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta", "Sabado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Se'
    };
  }

  carregarFornecedores() { 
    return this.fornecedorService.listarTodos()
      .then(fornecedores => {
        this.fornecedores = fornecedores.fornecedores.map(f => 
          ({ label: f.nomeFantasia, value: f.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCorrelatos(){
    return this.correlatoService.listarTodos()
      .then(correlatos => {
        this.correlatos = correlatos.map(med =>  
          ({ label: med.nome, value: med.codigo }));
          console.log(this.correlatos);
          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando(){
    return Boolean(this.entradaCorrelato.codigo)
  }

  carregarEntrada(codigo: number){
    this.entradaService.buscaPorCodigo(codigo)
    .then(entrada => {
      this.entradaCorrelato = entrada;
      this.atualizarTituloEdicao();
      
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizar(form);
    } else{
      this.adicionarEntrada(form);
    }
  }

  adicionarEntrada(form: FormControl){
    this.entradaService.salvar(this.entradaCorrelato)
    .then(() => {
      this.toasty.success('Entrada de correlato realizada com sucesso!');

      this.router.navigate(['/entradacorrelatos']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.entradaService.atualizar(this.entradaCorrelato)
    .then(entrada => {
      this.entradaCorrelato = entrada;
      this.toasty.success('Entrada de correlato atualizada com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.entradaMedicamento = new EntradaCorrelato();
    }.bind(this), 1);

    this.router.navigate(['/entradacorrelatos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de entrada: ${this.entradaCorrelato.correlato.nome}`)
  }

}
