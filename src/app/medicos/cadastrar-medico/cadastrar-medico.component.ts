import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/core/model';
import { MedicosService } from '../medicos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-medico',
  templateUrl: './cadastrar-medico.component.html',
  styleUrls: ['./cadastrar-medico.component.css']
})
export class CadastrarMedicoComponent implements OnInit {

  status = [
    {label:'Selecione', value:null},
    {label:'Ativo', value:true},
    {label:'Inativo', value:false},
  ]
  medico = new Medico();

  pt: any;

  constructor(
    private medicoService: MedicosService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    const codigoMedico = this.route.snapshot.params['codigo'];
    if(codigoMedico){
      this.carregarMedico(codigoMedico);
    }

    this.title.setTitle('Novo Médico');
    this.localizacaoCalendar();
  }

  get editando(){
    return Boolean(this.medico.codigo)
  }

  carregarMedico(codigo: number){
    this.medicoService.buscaPorCodigo(codigo)
    .then(medico => {
      this.medico = medico;
      this.atualizarTituloEdicao();
      
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: FormControl){
    if(this.editando){
      this.atualizar(form);
    } else{
      this.adicionarMedico(form);
    }
  }

  adicionarMedico(form: FormControl){
    this.medicoService.salvar(this.medico)
    .then(() => {
      this.toasty.success('Médico cadastrado com sucesso!');

      this.router.navigate(['/medicos']);
    })
    .catch(erro => this.errorHandler.handle(erro))
    
  }

  atualizar(form: FormControl){
    this.medicoService.atualizar(this.medico)
    .then(medico => {
      this.medico = medico;
      this.toasty.success('Medico atualizado com sucesso!');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.medico = new Medico();
    }.bind(this), 1);

    this.router.navigate(['/medicos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de médico: ${this.medico.nome}`);
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
