import { Component, OnInit, ViewChild } from '@angular/core';
import { EntradaDeCorrelatoFiltro, EntradaCorrelatosService } from '../entrada-correlatos.service';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pesquisa-correlatos',
  templateUrl: './pesquisa-correlatos.component.html',
  styleUrls: ['./pesquisa-correlatos.component.css']
})
export class PesquisaCorrelatosComponent implements OnInit {
  
  totalRegistros = 0;
  filtro = new EntradaDeCorrelatoFiltro();
  correlatos = []
  pt: any;
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private entradaCorrelatoService: EntradaCorrelatosService,
   private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Entrada de Correlatos');
    this.localizacaoCalendar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.entradaCorrelatoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.correlatos = resultado.correlatos;        
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(correlato: any) {
    this.confirmation.confirm({
      message: "Deseja excluir esta entrada?",
      accept: () => {
        this.excluir(correlato);
      }
    });
  }

  excluir(correlato: any) {
    this.entradaCorrelatoService.excluir(correlato.codigo)
      .then(() => {
        console.log("excluido");
        this.grid.reset();
        this.toasty.success('Entrada de Correlato excluída com sucesso!')
      })
      .catch(erro => this.errorHandler.handle(erro));
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
