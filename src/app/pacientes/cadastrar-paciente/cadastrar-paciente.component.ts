import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Paciente } from 'src/app/core/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.css']
})
export class CadastrarPacienteComponent implements OnInit {

  paciente = new Paciente();

  pt: any;

  sexos = [
    {label:'Masculino', value:'M'},
    {label:'Feminino', value:'F'}
  ]

  constructor(
    private pacienteService: PacienteService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoPaciente = this.route.snapshot.params['codigo'];
    if (codigoPaciente) {
      this.carregarPaciente(codigoPaciente);
    }

    this.title.setTitle('Novo Paciente');
    this.localizacaoCalendar();
  }

  get editando() {
    return Boolean(this.paciente.codigo)
  }

  carregarPaciente(codigo: number) {
    this.pacienteService.buscaPorCodigo(codigo)
      .then(paciente => {
        this.paciente = paciente;
        this.atualizarTituloEdicao();

      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionarPaciente(form);
    }
  }

  adicionarPaciente(form: FormControl) {
    this.pacienteService.salvar(this.paciente)
      .then(() => {
        this.toasty.success('Paciente cadastrado com sucesso!');

        this.router.navigate(['/pacientes']);
      })
      .catch(erro => this.errorHandler.handle(erro))

  }

  atualizar(form: FormControl) {
    this.pacienteService.atualizar(this.paciente)
      .then(paciente => {
        this.paciente = paciente;
        this.toasty.success('Paciente atualizado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.paciente = new Paciente();
    }.bind(this), 1);

    this.router.navigate(['/pacientes/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Paciente: ${this.paciente.nome}`);
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
    }
  }
}
