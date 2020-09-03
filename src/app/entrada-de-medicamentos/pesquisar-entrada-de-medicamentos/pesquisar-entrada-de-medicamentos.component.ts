import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MenuItem, ConfirmationService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { EntradaDeMedicamentoService, EntradaDeMedicamentoFiltro } from '../entrada-de-medicamento.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/seguranca/auth.service';


@Component({
  selector: 'app-pesquisar-entrada-de-medicamentos',
  templateUrl: './pesquisar-entrada-de-medicamentos.component.html',
  styleUrls: ['./pesquisar-entrada-de-medicamentos.component.css']
})
export class PesquisarEntradaDeMedicamentosComponent implements OnInit {
  totalRegistros = 0;
  filtro = new EntradaDeMedicamentoFiltro();
  medicamentos = [];
  pt: any;
  @ViewChild('tabela', { static: true }) grid: Table;
  items: MenuItem[];
  
  constructor(
    private entradaMedicamentoService: EntradaDeMedicamentoService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Entrada de Medicamentos');
    this.localizacaoCalendar();

    this.items = [
      { label: 'Nova Entrada', icon: 'pi pi-plus', routerLink:'/entradamedicamentos/novo' },
      { label: 'Categoria de Medicamento', icon: 'pi pi-search-plus', routerLink: '/categorias' },
      { label: 'Cadastrar Tipo de Medicamento', icon: 'pi pi-plus', routerLink: '/tiposmedicamentos' },
      { label: 'Saida Por Paciente', icon: 'pi pi-file-excel', routerLink: '/saidamedicamento' },
      { label: 'Saida Por Centro de Custo', icon: 'pi pi-file-excel', routerLink: '/saidamedicamentocentrodecusto' },
    ];
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

  confirmarExclusao(correlato: any) {
    this.confirmation.confirm({
      message: "Deseja excluir esta entrada?",
      accept: () => {
        this.excluir(correlato);
      }
    });
  }

  excluir(correlato: any) {
    this.entradaMedicamentoService.excluir(correlato.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.messageService.add({ severity:'success', detail:'Entrada de Correlato excluída com sucesso!'})
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
