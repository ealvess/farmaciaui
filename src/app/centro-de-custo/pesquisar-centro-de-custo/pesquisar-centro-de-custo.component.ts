import { Component, OnInit, ViewChild } from '@angular/core';
import { CentroDeCustoFiltro, CentroDeCustoService } from '../centro-de-custo.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-centro-de-custo',
  templateUrl: './pesquisar-centro-de-custo.component.html',
  styleUrls: ['./pesquisar-centro-de-custo.component.css']
})
export class PesquisarCentroDeCustoComponent implements OnInit {

  centroDeCusto = [];
  totalRegistros = 0;
  filtro = new CentroDeCustoFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  status = [
    {label:'Selecione', value:null},
    {label:'Ativo', value:true},
    {label:'Inativo', value:false},
  ]

  constructor(
    private centroDeCustoService: CentroDeCustoService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.pesquisar();
    this.title.setTitle('Pesquisa de centro de custo');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.centroDeCustoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.centroDeCusto = resultado.centroDeCustos;        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  alternarStatus(centro: any): void {
    const novoStatus = !centro.ativo;
    this.centroDeCustoService.mudarStatus(centro.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        centro.ativo = novoStatus;
        
        this.messageService.add({ severity: 'success', detail:`Centro de Custo ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(centro: any) {
    this.confirmation.confirm({
      message: "Deseja excluir este Centro de Custo?",
      accept: () => {
        this.excluir(centro);
      }
    });
  }

  excluir(centro: any) {
    this.centroDeCustoService.excluir(centro.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity:'success',  detail:'Centro de Custo excluído com sucesso!'})
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
