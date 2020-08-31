import { Component, OnInit, Input } from '@angular/core';
import { FornecedorService } from 'src/app/fornecedores/fornecedor.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { TiposDeMedicamentosService } from 'src/app/tipos-de-medicamentos/pesquisar-tipos-de-medicamentos.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EntradaMedicamento } from 'src/app/core/model';
import { EntradaDeMedicamentoService } from '../entrada-de-medicamento.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-entrada-de-medicamentos',
  templateUrl: './cadastrar-entrada-de-medicamentos.component.html',
  styleUrls: ['./cadastrar-entrada-de-medicamentos.component.css']
})
export class CadastrarEntradaDeMedicamentosComponent implements OnInit {

  pt: any;
  fornecedores = [];
  medicamentos = [];

  entradaMedicamento = new EntradaMedicamento();

  @Input() codigoEntrada: number;

  constructor(
    private fornecedorService: FornecedorService,
    private medicamentoService: TiposDeMedicamentosService,
    private entradaService: EntradaDeMedicamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.localizacaoCalendar();
    this.carregarFornecedores();
    this.carregarMedicamentos();

    this.codigoEntrada = this.route.snapshot.params['codigo'];
    if(this.codigoEntrada){
      this.carregarEntrada(this.codigoEntrada);
    }

    this.title.setTitle('Nova Entrada de Medicamento')
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

  carregarMedicamentos(){
    return this.medicamentoService.listarTodos()
      .then(medicamentos => {
        this.medicamentos = medicamentos.map(med =>  
          ({ label: med.nome, value: med.codigo }));
          console.log(this.medicamentos);
          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando(){
    return Boolean(this.entradaMedicamento.codigo)
  }

  carregarEntrada(codigo: number){
    this.entradaService.buscaPorCodigo(codigo)
    .then(entrada => {
      this.entradaMedicamento = entrada;
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
    this.entradaService.salvar(this.entradaMedicamento)
    .then(() => {
      this.messageService.add({ severity:'success', detail:'Entrada de medicamento realizada com sucesso!'});

      this.router.navigate(['/entradamedicamentos']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.entradaService.atualizar(this.entradaMedicamento)
    .then(entrada => {
      this.entradaMedicamento = entrada;
      this.messageService.add({ severity:'success',  detail:'Entrada de medicamento atualizada com sucesso!'});
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.entradaMedicamento = new EntradaMedicamento();
    }.bind(this), 1);

    this.router.navigate(['/entradamedicamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de entrada: ${this.entradaMedicamento.medicamento.nome}`)
  }

}
