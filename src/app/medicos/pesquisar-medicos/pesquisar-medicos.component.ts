import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoFiltro, MedicosService } from '../medicos.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-medicos',
  templateUrl: './pesquisar-medicos.component.html',
  styleUrls: ['./pesquisar-medicos.component.css']
})
export class PesquisarMedicosComponent implements OnInit {

  medicos = [];
  totalRegistros = 0;
  filtro = new MedicoFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  status = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false },
  ]

  constructor(
    private medicoService: MedicosService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.pesquisar();
    this.title.setTitle('Pesquisa de medicos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.medicoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.medicos = resultado.medicos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  alternarStatus(medico: any): void {
    const novoStatus = !medico.ativo;
    this.medicoService.mudarStatus(medico.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        medico.ativo = novoStatus;

        this.messageService.add({ severity:'success', detail:`Médico ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(medico: any) {
    this.confirmation.confirm({
      message: "Deseja excluir este Médico?",
      accept: () => {
        this.excluir(medico);
      }
    });
  }

  excluir(medico: any) {
    this.medicoService.excluir(medico.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity:'success', detail:'Médico excluída com sucesso!'})
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
