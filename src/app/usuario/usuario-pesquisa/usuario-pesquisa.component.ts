import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UsuarioFiltro, UsuarioService } from '../usuario.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  
  usuarios = [];
  categorias = [];
  totalRegistros = 0;
  filtro = new UsuarioFiltro();
  @ViewChild('tabela', { static: true }) grid: Table;

  constructor(
    private usuarioService: UsuarioService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de usuários');

    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.usuarioService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;        
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(usuario: any) {
    this.confirmation.confirm({
      message: "Deseja excluir o usuario?",
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity:'success', detail:'Usuario excluído com sucesso!'})
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(usuario: any): void {
    const novoStatus = !usuario.ativo;
    this.usuarioService.mudarStatus(usuario.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        usuario.ativo = novoStatus;
        
        this.messageService.add({ severity:'success', detail:`Usuario ${acao} com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
