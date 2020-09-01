import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  medicamentoPorMes: any;
  correlatosPorMes: any;
  lineChartData: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.configurarGraficoPizzaMedicamento();
    this.configurarGraficoLinha();
    this.configurarGraficoPizzaCorrelato();
  }

  configurarGraficoPizzaMedicamento() {
    this.dashboardService.EntradasDeMedicamentoPorMedicamento()
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

  configurarGraficoLinha() {
    this.dashboardService.EntradasDeMedicamentoPorDia()
      .then(dados => {
        console.log('grafico dias', dados);
        const diasDoMes = this.configurarDiasMes();
        const totaisMedicamentos = this.totaisPorCadaDiaMes(dados.filter(
          dado => dado.medicamento.nome === 'HEXOMEDINE'), diasDoMes);
        const totaisMedicamentoss = this.totaisPorCadaDiaMes(dados.filter(
          dado => dado.medicamento.nome === 'DIPIRONA 500MG'), diasDoMes);
        console.log('teste', totaisMedicamentos);

        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'HEXO',
              data: totaisMedicamentos,
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
            },
            {
              label: 'DIPI',
              data: totaisMedicamentoss,
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
            }
          ]
        }
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

  private totaisPorCadaDiaMes(dados, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }


}
