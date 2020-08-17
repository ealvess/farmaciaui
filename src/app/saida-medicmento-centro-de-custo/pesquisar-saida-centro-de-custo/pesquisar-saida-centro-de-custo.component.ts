import { Component, OnInit } from '@angular/core';
import { SaidaDeMedicamentoPorCentroDeCustoFiltro, CadastrarSaidaCentroDeCustoService } from '../cadastrar-saida-centro-de-custo.service';
import { MenuItem, LazyLoadEvent } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-saida-centro-de-custo',
  templateUrl: './pesquisar-saida-centro-de-custo.component.html',
  styleUrls: ['./pesquisar-saida-centro-de-custo.component.css']
})
export class PesquisarSaidaCentroDeCustoComponent implements OnInit {

  totalRegistros = 0;
  filtro = new SaidaDeMedicamentoPorCentroDeCustoFiltro();
  medicamentos = [];
  pt: any;
  items: MenuItem[];

  constructor(
    private saidaMedicamentoPorCentroDeCustoService: CadastrarSaidaCentroDeCustoService,
    private auth: AuthService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Saida de Medicamentos Por Centro De Custo');
    this.localizacaoCalendar();

    this.items = [
      { label: 'Nova Entrada', icon: 'pi pi-plus', routerLink: '/entradamedicamentos/novo' },
      { label: 'Categoria de Medicamento', icon: 'pi pi-search-plus', routerLink: '/categorias' }
    ];
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.saidaMedicamentoPorCentroDeCustoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.medicamentos = resultado.medicamentos;
        console.log('dados', this.medicamentos);
        
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
