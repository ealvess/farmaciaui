import { Component, OnInit, ViewChild } from '@angular/core';
import { FornecedorService, fornecedorFiltro } from '../fornecedor.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
})
export class FornecedorComponent implements OnInit {

  totalRegistros = 0;
  filtro = new fornecedorFiltro();
  fornecedores = []
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private fornecedorService: FornecedorService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de fornecedores');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.fornecedorService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.fornecedores = resultado.fornecedores;        
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: "Deseja excluir o fornecedor?",
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.fornecedorService.excluir(lancamento.codigo)
      .then(() => {
        console.log("excluido");
        this.grid.reset();
        this.messageService.add({ severity:'success', detail:'Fornecedor excluído com sucesso!'})
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  alternarStatus(fornecedor: any): void {
    const novoStatus = !fornecedor.ativo;
    this.fornecedorService.mudarStatus(fornecedor.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        fornecedor.ativo = novoStatus;
        
        this.messageService.add({ severity:'success', detail:`Fornecedor ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

}
