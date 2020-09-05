import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { MessageService } from 'primeng/api';

import { PacienteService } from '../paciente.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Paciente } from 'src/app/core/model';


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
    private messageService: MessageService,
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
        this.messageService.add({ severity:'success', detail:'Paciente cadastrado com sucesso!'});

        this.router.navigate(['/pacientes']);
      })
      .catch(erro => this.errorHandler.handle(erro))

  }

  atualizar(form: FormControl) {
    this.pacienteService.atualizar(this.paciente)
      .then(paciente => {
        this.paciente = paciente;
        this.messageService.add({ severity:'success', detail:'Paciente atualizado com sucesso!'});
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

  generatePDF(form: FormControl) {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('farmacia.pdf');
    });

    form.markAsUntouched();
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
