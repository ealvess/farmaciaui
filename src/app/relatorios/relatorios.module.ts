import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';


import {SharedModule} from '../shared/shared.module'
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RelatorioComponent],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule,
    FormsModule,

    PanelModule,
    ButtonModule,
    CalendarModule,
    AccordionModule,
    CardModule
  ]
})
export class RelatoriosModule { }
