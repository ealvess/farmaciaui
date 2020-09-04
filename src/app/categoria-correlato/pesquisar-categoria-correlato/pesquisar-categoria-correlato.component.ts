import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaCorrelatoService, CategoriaCorrelatoFiltro } from '../categoria-correlato.service';
import {MessageService} from 'primeng/api';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-categoria-correlato',
  templateUrl: './pesquisar-categoria-correlato.component.html',
  styleUrls: ['./pesquisar-categoria-correlato.component.css']
})
export class PesquisarCategoriaCorrelatoComponent implements OnInit {

  categorias = [];
  totalRegistros = 0;
  filtro = new CategoriaCorrelatoFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  status = [
    {label:'Selecione', value:null},
    {label:'Ativo', value:true},
    {label:'Inativo', value:false},
  ]

  constructor(
    private categoriaService: CategoriaCorrelatoService,
    public auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.pesquisar();
    this.title.setTitle('Pesquisa de Categorias de Correlatos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.categoriaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.categorias = resultado.categorias;        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  alternarStatus(categoria: any): void {
    const novoStatus = !categoria.ativo;
    this.categoriaService.mudarStatus(categoria.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        categoria.ativo = novoStatus;
        
        this.messageService.add({ severity: 'success', detail:`Categoria ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(categoria: any) {
    this.confirmation.confirm({
      message: "Deseja excluir esta categoria?",
      accept: () => {
        this.excluir(categoria);
      }
    });
  }

  excluir(categoria: any) {
    this.categoriaService.excluir(categoria.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail:'Categoria excluída com sucesso!' } )
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
