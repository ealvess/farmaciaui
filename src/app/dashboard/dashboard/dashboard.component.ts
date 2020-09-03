import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  medicamentoPorMes: any;
  saidaPacientes: any;
  saidaCentroDeCusto:any;
  correlatosPorMes: any;
  saidaCorrelatosPorMes:any;
  lineChartData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.configurarGraficoPizzaEntradaMedicamento();
    this.configurarGraficoPizzaSaidaMedicamentoParaPacientesPorMes();
    this.configurarGraficoPizzaSaidaMedicamentoParaCentroDeCustoPorMes();
    this.configurarGraficoPizzaCorrelato();
    this.configurarGraficoPizzaSaidaCorrelato();
  }

  configurarGraficoPizzaEntradaMedicamento() {
    this.dashboardService.EntradasDeMedicamentoPorMes()
      .then(dados => {
        this.medicamentoPorMes = {
          labels: dados.map(dado => dado.medicamento.nome),
          datasets: [
            {
              data: dados.map(dado => dado.quantidade),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912', '#be0027', '#ffdd00', '#279b37', '#52325d',
                '#00a78e', '#0cb9c1', '##ff9933', '#b4a996', '#000000', '#00395d', '#0033a1',
                '#84754e', '#f9e498', '#ff7243', '#ff4816', '#f65a5b', '#d2ea32', '#2db928',
                '#30660f', '#ae9a64', '#606061', '#a3a7a6', '#ff0092', '#cd595a', '#ffaaaa']
            }
          ]
        };
      });
  }

  configurarGraficoPizzaSaidaMedicamentoParaPacientesPorMes() {
    this.dashboardService.SaidaDeMedicamentoPorMesParaPacientes()
      .then(dados => {        
        this.saidaPacientes = {
          labels: dados.map(dado => dado.medicamento.medicamento.nome),
          datasets: [
            {
              data: dados.map(dado => dado.quantidade),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912', '#be0027', '#ffdd00', '#279b37', '#52325d',
                '#00a78e', '#0cb9c1', '##ff9933', '#b4a996', '#000000', '#00395d', '#0033a1',
                '#84754e', '#f9e498', '#ff7243', '#ff4816', '#f65a5b', '#d2ea32', '#2db928',
                '#30660f', '#ae9a64', '#606061', '#a3a7a6', '#ff0092', '#cd595a', '#ffaaaa']
            }
          ]
        };
      });
  }

  configurarGraficoPizzaSaidaMedicamentoParaCentroDeCustoPorMes() {
    this.dashboardService.SaidaDeMedicamentoPorMesParaPacientes()
      .then(dados => {
        this.saidaCentroDeCusto = {
          labels: dados.map(dado => dado.medicamento.medicamento.nome),
          datasets: [
            {
              data: dados.map(dado => dado.quantidade),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912', '#be0027', '#ffdd00', '#279b37', '#52325d',
                '#00a78e', '#0cb9c1', '##ff9933', '#b4a996', '#000000', '#00395d', '#0033a1',
                '#84754e', '#f9e498', '#ff7243', '#ff4816', '#f65a5b', '#d2ea32', '#2db928',
                '#30660f', '#ae9a64', '#606061', '#a3a7a6', '#ff0092', '#cd595a', '#ffaaaa']
            }
          ]
        };
      });
  }

  configurarGraficoPizzaCorrelato() {
    this.dashboardService.EntradasDeCorrelatoPorMes()
      .then(dados => {        
        this.correlatosPorMes = {
          labels: dados.map(dado => dado.correlato.nome),
          datasets: [
            {
              data: dados.map(dado => dado.quantidade),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912', '#be0027', '#ffdd00', '#279b37', '#52325d',
                '#00a78e', '#0cb9c1', '##ff9933', '#b4a996', '#000000', '#00395d', '#0033a1',
                '#84754e', '#f9e498', '#ff7243', '#ff4816', '#f65a5b', '#d2ea32', '#2db928',
                '#30660f', '#ae9a64', '#606061', '#a3a7a6', '#ff0092', '#cd595a', '#ffaaaa']
            }
          ]
        };
      });
  }

  configurarGraficoPizzaSaidaCorrelato() {
    this.dashboardService.SaidaDeCorrelatoPorMes()
      .then(dados => {
        this.saidaCorrelatosPorMes = {
          labels: dados.map(dado => dado.correlato.correlato.nome),
          datasets: [
            {
              data: dados.map(dado => dado.quantidade),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912', '#be0027', '#ffdd00', '#279b37', '#52325d',
                '#00a78e', '#0cb9c1', '##ff9933', '#b4a996', '#000000', '#00395d', '#0033a1',
                '#84754e', '#f9e498', '#ff7243', '#ff4816', '#f65a5b', '#d2ea32', '#2db928',
                '#30660f', '#ae9a64', '#606061', '#a3a7a6', '#ff0092', '#cd595a', '#ffaaaa']
            }
          ]
        };
      });
  }

}
