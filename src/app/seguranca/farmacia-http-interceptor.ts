import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

export class NotAuthenticatedError { }

@Injectable()
export class FarmaciaHttpInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
            return from(this.auth.obterNovoAccessToken())
                .pipe(
                    mergeMap(() => {
                        if (this.auth.isAccessTokenInvalido()) {
                            throw new NotAuthenticatedError();
                        }

                        req = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        return next.handle(req);
                    }),
                    catchError(error => {
                        if (this.auth.isAccessTokenInvalido()) {
                            throw new NotAuthenticatedError();
                        }

                        return next.handle(req);
                    })
                );
        }

        return next.handle(req);
    }
}