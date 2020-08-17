import { Component, OnInit } from '@angular/core';
import { SaidaDeMedicamentoModule } from '../saida-de-medicamento.module';
import { SaidaDeMedicamentoFiltro, SaidaDeMedicamentoService } from '../saida-de-medicamento.service';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-saida',
  templateUrl: './pesquisar-saida.component.html',
  styleUrls: ['./pesquisar-saida.component.css']
})
export class PesquisarSaidaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new SaidaDeMedicamentoFiltro();
  medicamentos = [];
  pt: any;


  constructor(
    private saidaMedicamentoService: SaidaDeMedicamentoService,
    private auth: AuthService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Saida de Medicamentos Por Pacientes');
    this.localizacaoCalendar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.saidaMedicamentoService.pesquisar(this.filtro)
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
