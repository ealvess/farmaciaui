import { Component, OnInit } from '@angular/core';
import { SaidaDeCorrelato } from 'src/app/core/model';
import { CadastrarSaidaDeCorrelatoService } from '../cadastrar-saida-de-correlato.service';
import { CentroDeCustoService } from 'src/app/centro-de-custo/centro-de-custo.service';
import { EntradaCorrelatosService } from 'src/app/entrada-de-correlatos/entrada-correlatos.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-saida-de-correlato',
  templateUrl: './cadastrar-saida-de-correlato.component.html',
  styleUrls: ['./cadastrar-saida-de-correlato.component.css']
})
export class CadastrarSaidaDeCorrelatoComponent implements OnInit {

  saidaPorCentroDeCusto = new SaidaDeCorrelato();
  centrodeCusto = [];
  correlatos = [];
  pt: any;
  valorUnitario: number;
  total:number;
  quantidade: any;

  constructor(
    private saidaService: CadastrarSaidaDeCorrelatoService,
    private centroDeCustoService: CentroDeCustoService,
    private entradaCorrelatoService: EntradaCorrelatosService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Saida de Correlato Por Centro de Custo')
    this.carregarCentroDeCusto();
    this.carregarCorrelatos();
    this.localizacaoCalendar();
  }

  carregarCentroDeCusto() { 
    return this.centroDeCustoService.listarTodas()
      .then(centrodeCusto => {
        this.centrodeCusto = centrodeCusto.map(cat =>  
          ({ label: cat.nome, value: cat.codigo }));          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCorrelatos() { 
    return this.entradaCorrelatoService.listarTodos()
      .then(correlatos => {
        this.correlatos = correlatos.map(cor =>  
          ({ label: cor.correlato.nome, value: cor.codigo }));
          console.log('correlatos', correlatos);
          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pegarValores(codigo: number){
    return this.entradaCorrelatoService.buscaPorCodigo(codigo)
    .then(correlatos => {
      this.valorUnitario = correlatos.valorUnitario;
      console.log('valor unitario', this.valorUnitario);
      console.log('Busca por codigo', correlatos);
      
    });
  }

  salvar(form: FormControl){
    this.saidaPorCentroDeCusto.valorUnitario = this.valorUnitario;
    this.saidaPorCentroDeCusto.total = this.saidaPorCentroDeCusto.quantidade * this.valorUnitario;
    console.log('salvar', this.saidaPorCentroDeCusto);
    
    this.saidaService.salvar(this.saidaPorCentroDeCusto)
    .then(() => {
      this.toasty.success('Saida de correlato realizada!');

      form.reset();
      this.saidaPorCentroDeCusto = new SaidaDeCorrelato();
      this.router.navigate(['/saidacorrelatoporcentrodecusto']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.saidaPorCentroDeCusto = new SaidaDeCorrelato();
    }.bind(this), 1);

    this.router.navigate(['/saidacorrelatoporcentrodecusto/novo']);
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

}