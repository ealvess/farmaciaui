import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService, CategoriaFiltro } from '../categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pesquisar-categoria',
  templateUrl: './pesquisar-categoria.component.html',
  styleUrls: ['./pesquisar-categoria.component.css']
})
export class PesquisarCategoriaComponent implements OnInit {

  categorias = [];
  totalRegistros = 0;
  filtro = new CategoriaFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  status = [
    {label:'Selecione', value:null},
    {label:'Ativo', value:true},
    {label:'Inativo', value:false},
  ]

  constructor(
    private categoriaService: CategoriaService,
    private auth: AuthService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.pesquisar();
    this.title.setTitle('Pesquisa de categorias');
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
        const acao = novoStatus ? 'ativado' : 'desativado';

        categoria.ativo = novoStatus;
        
        this.toasty.success(`Categoria ${acao} com sucesso!`);
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
        this.toasty.success('Categoria excluída com sucesso!')
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
