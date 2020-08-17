import { Component, OnInit } from '@angular/core';
import { SaidaDeCorrelatoFiltro, CadastrarSaidaDeCorrelatoService } from '../cadastrar-saida-de-correlato.service';
import { MenuItem, LazyLoadEvent } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-saida-de-correlato',
  templateUrl: './pesquisar-saida-de-correlato.component.html',
  styleUrls: ['./pesquisar-saida-de-correlato.component.css']
})
export class PesquisarSaidaDeCorrelatoComponent implements OnInit {

  totalRegistros = 0;
  filtro = new SaidaDeCorrelatoFiltro();
  correlatos = [];
  pt: any;

  constructor(
    private saidaCorrelatoService: CadastrarSaidaDeCorrelatoService,
    private auth: AuthService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Saida de Correlatos Por Centro De Custo');
    this.localizacaoCalendar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.saidaCorrelatoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.correlatos = resultado.correlatos;
        console.log('dados', this.correlatos);
                      
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
