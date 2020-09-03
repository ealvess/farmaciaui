import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component'
import { FarmaciaHttpInterceptor } from './farmacia-http-interceptor'

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { environment } from 'src/environments/environment';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.whitelistedDomains],
        blacklistedRoutes: [environment.blacklistedRoutes]
      }
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FarmaciaHttpInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
