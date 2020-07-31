import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { EntradaDeMedicamentoService, EntradaDeMedicamentoFiltro } from '../entrada-de-medicamento.service';


@Component({
  selector: 'app-pesquisar-entrada-de-medicamentos',
  templateUrl: './pesquisar-entrada-de-medicamentos.component.html',
  styleUrls: ['./pesquisar-entrada-de-medicamentos.component.css']
})
export class PesquisarEntradaDeMedicamentosComponent implements OnInit {
  totalRegistros = 0;
  filtro = new EntradaDeMedicamentoFiltro();
  medicamentos = []
  pt: any;
  
  constructor(private entradaMedicamentoService: EntradaDeMedicamentoService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Entrada de Medicamentos');
    this.localizacaoCalendar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.entradaMedicamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.medicamentos = resultado.medicamentos;        
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
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
