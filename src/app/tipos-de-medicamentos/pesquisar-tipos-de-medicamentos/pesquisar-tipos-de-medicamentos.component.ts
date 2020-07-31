import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeMedicamentoFiltro, TiposDeMedicamentosService } from '../pesquisar-tipos-de-medicamentos.service';
import { Table } from 'primeng/table';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pesquisar-tipos-de-medicamentos',
  templateUrl: './pesquisar-tipos-de-medicamentos.component.html',
  styleUrls: ['./pesquisar-tipos-de-medicamentos.component.css']
})
export class PesquisarTiposDeMedicamentosComponent implements OnInit {

  tiposDeMedicamentos = [];
  categorias = [];
  totalRegistros = 0;
  filtro = new TiposDeMedicamentoFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private medicamentoService: TiposDeMedicamentosService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de medicamentos');

    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.medicamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.tiposDeMedicamentos = resultado.medicamentos;        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(medicamento: any) {
    this.confirmation.confirm({
      message: "Deseja excluir o medicamento?",
      accept: () => {
        this.excluir(medicamento);
      }
    });
  }

  excluir(medicamento: any) {
    this.medicamentoService.excluir(medicamento.codigo)
      .then(() => {
        console.log("excluido");
        this.grid.reset();
        this.toasty.success('Medicamento excluído com sucesso!')
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(medicamento: any): void {
    const novoStatus = !medicamento.ativo;
    this.medicamentoService.mudarStatus(medicamento.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        medicamento.ativo = novoStatus;
        
        this.toasty.success(`Mediccamento ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
