import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposDeCorrelatoFiltro, TiposCorrelatosService } from '../tipos-correlatos.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-tipos-correlatos',
  templateUrl: './pesquisar-tipos-correlatos.component.html',
  styleUrls: ['./pesquisar-tipos-correlatos.component.css']
})
export class PesquisarTiposCorrelatosComponent implements OnInit {
  
  tiposDeCorrelatos = [];
  categoriasDeCorrelatos = [];
  totalRegistros = 0;
  filtro = new TiposDeCorrelatoFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private correlatoService: TiposCorrelatosService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de correlatos');

    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.correlatoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.tiposDeCorrelatos = resultado.correlatos;  
        console.log('Categorias', this.tiposDeCorrelatos);
              
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(correlato: any) {
    this.confirmation.confirm({
      message: "Deseja excluir este correlato?",
      accept: () => {
        this.excluir(correlato);
      }
    });
  }

  excluir(correlato: any) {
    this.correlatoService.excluir(correlato.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity:'success', detail:'Correlato excluído com sucesso!'})
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(correlato: any): void {
    const novoStatus = !correlato.ativo;
    this.correlatoService.mudarStatus(correlato.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        correlato.ativo = novoStatus;
        
        this.messageService.add({ severity:'success', detail:`Correlato ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
