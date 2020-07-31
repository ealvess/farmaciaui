import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteFiltro, PacienteService } from '../paciente.service';
import { Table } from 'primeng/table';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pesquisar-paciente',
  templateUrl: './pesquisar-paciente.component.html',
  styleUrls: ['./pesquisar-paciente.component.css']
})
export class PesquisarPacienteComponent implements OnInit {

  pacientes = [];
  totalRegistros = 0;
  filtro = new PacienteFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;


  constructor(
    private pacienteService: PacienteService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.pesquisar();
    this.title.setTitle('Pesquisa de Pacientes');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pacienteService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pacientes = resultado.pacientes;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(paciente: any) {
    this.confirmation.confirm({
      message: "Deseja excluir este Paciente?",
      accept: () => {
        this.excluir(paciente);
      }
    });
  }

  excluir(paciente: any) {
    this.pacienteService.excluir(paciente.codigo)
      .then(() => {
        this.grid.reset();
        this.toasty.success('Paciente excluído com sucesso!')
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
