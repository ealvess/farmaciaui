import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SaidaDeMedicamento } from 'src/app/core/model';
import { SaidaDeMedicamentoService } from '../saida-de-medicamento.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PacienteService } from 'src/app/pacientes/paciente.service';
import { EntradaDeMedicamentoService } from 'src/app/entrada-de-medicamentos/entrada-de-medicamento.service';

@Component({
  selector: 'app-cadastrar-saida-por-paciente',
  templateUrl: './cadastrar-saida-por-paciente.component.html',
  styleUrls: ['./cadastrar-saida-por-paciente.component.css']
})
export class CadastrarSaidaPorPacienteComponent implements OnInit {

  saidaPorPaciente = new SaidaDeMedicamento();
  pacientes = [];
  medicamentos = [];
  pt: any;
  valorUnitario: number;
  total:number;
  quantidade: any;

  constructor(
    private saidaService: SaidaDeMedicamentoService,
    private pacienteService: PacienteService,
    private entradaMedicamentoService: EntradaDeMedicamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Saida de Medicamento Por Paciente')
    this.carregarPacientes();
    this.carregarMedicamentos();
    this.localizacaoCalendar();
  }

  carregarPacientes() { 
    return this.pacienteService.listarTodos()
      .then(pacientes => {
        this.pacientes = pacientes.map(cat =>  
          ({ label: cat.nome, value: cat.codigo }));
          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMedicamentos() { 
    return this.entradaMedicamentoService.listarTodas()
      .then(medicamentos => {
        this.medicamentos = medicamentos.map(med =>  
          ({ label: med.medicamento.nome, value: med.codigo }));
          
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pegarValores(codigo: number){
    return this.entradaMedicamentoService.buscaPorCodigo(codigo)
    .then(medicamentos => {
      this.valorUnitario = medicamentos.valorUnitario;
    });
  }

  salvar(form: FormControl){
    this.saidaPorPaciente.valorUnitario = this.valorUnitario;
    this.saidaPorPaciente.total = this.saidaPorPaciente.quantidade * this.valorUnitario;
    console.log('Salvar', this.saidaPorPaciente);
    
    this.saidaService.salvar(this.saidaPorPaciente)
    .then(() => {
      this.messageService.add({ severity:'success', detail:'Saida de medicamento realizada!'});

      form.reset();
      this.saidaPorPaciente = new SaidaDeMedicamento();
      this.router.navigate(['/saidamedicamento']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.saidaPorPaciente = new SaidaDeMedicamento();
    }.bind(this), 1);

    this.router.navigate(['/saidamedicamento/novo']);
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
    };
  }

}
