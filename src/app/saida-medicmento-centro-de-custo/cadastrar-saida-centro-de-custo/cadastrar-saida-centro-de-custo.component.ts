import { Component, OnInit } from '@angular/core';
import { SaidaDeMedicamentoPorCentroDeCusto } from 'src/app/core/model';
import { CadastrarSaidaCentroDeCustoService } from '../cadastrar-saida-centro-de-custo.service';
import { CentroDeCustoService } from 'src/app/centro-de-custo/centro-de-custo.service';
import { EntradaDeMedicamentoService } from 'src/app/entrada-de-medicamentos/entrada-de-medicamento.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-saida-centro-de-custo',
  templateUrl: './cadastrar-saida-centro-de-custo.component.html',
  styleUrls: ['./cadastrar-saida-centro-de-custo.component.css']
})
export class CadastrarSaidaCentroDeCustoComponent implements OnInit {

  saidaPorCentroDeCusto = new SaidaDeMedicamentoPorCentroDeCusto();
  centroDeCusto = [];
  medicamentos = [];
  pt: any;
  valorUnitario: number;
  total:number;
  quantidade: any;

  constructor(
    private saidaService: CadastrarSaidaCentroDeCustoService,
    private centroDeCustoService: CentroDeCustoService,
    private entradaMedicamentoService: EntradaDeMedicamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Saida de Medicamento Por Centro De Custo')
    this.carregarCentroDeCusto();
    this.carregarMedicamentos();
    this.localizacaoCalendar();
  }

  carregarCentroDeCusto() { 
    return this.centroDeCustoService.listarTodas()
      .then(centroDeCusto => {
        this.centroDeCusto = centroDeCusto.map(cat =>  
          ({ label: cat.nome, value: cat.codigo }));
          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMedicamentos() { 
    return this.entradaMedicamentoService.listarTodas()
      .then(medicamentos => {
        this.medicamentos = medicamentos.map(med =>  
          ({ label: med.medicamento.nome, value: med.codigo }));
          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pegarValores(codigo: number){
    return this.entradaMedicamentoService.buscaPorCodigo(codigo)
    .then(medicamentos => {
      this.valorUnitario = medicamentos.valorUnitario;
    });
  }

  salvar(form: FormControl){
    this.saidaPorCentroDeCusto.valorUnitario = this.valorUnitario;
    this.saidaPorCentroDeCusto.total = this.saidaPorCentroDeCusto.quantidade * this.valorUnitario;
    console.log('Saida', this.saidaPorCentroDeCusto);
    
    this.saidaService.salvar(this.saidaPorCentroDeCusto)
    .then(() => {
      this.messageService.add({ severity:'success', detail:'Saida de medicamento realizada!'});

      form.reset();
      this.saidaPorCentroDeCusto = new SaidaDeMedicamentoPorCentroDeCusto();
      this.router.navigate(['/saidamedicamentocentrodecusto']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.saidaPorCentroDeCusto = new SaidaDeMedicamentoPorCentroDeCusto();
    }.bind(this), 1);

    this.router.navigate(['/saidamedicamentocentrodecusto/novo']);
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
