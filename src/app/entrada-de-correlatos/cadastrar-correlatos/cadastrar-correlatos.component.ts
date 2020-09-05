import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { MessageService } from 'primeng/api';

import { EntradaCorrelato } from 'src/app/core/model';
import { FornecedorService } from 'src/app/fornecedores/fornecedor.service';
import { TiposCorrelatosService } from 'src/app/tipos-de-correlatos/tipos-correlatos.service';
import { EntradaCorrelatosService } from '../entrada-correlatos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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
    private messageService: MessageService,
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
      this.messageService.add({ severity: 'success',  detail:'Entrada de correlato realizada com sucesso!'});

      this.router.navigate(['/entradacorrelatos']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.entradaService.atualizar(this.entradaCorrelato)
    .then(entrada => {
      this.entradaCorrelato = entrada;
      this.messageService.add({ severity:'success', detail:'Entrada de correlato atualizada com sucesso!'});
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
