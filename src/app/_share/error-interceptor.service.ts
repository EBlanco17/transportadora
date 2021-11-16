import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError, retry } from 'rxjs/operators';
import { Mensajes } from '../_share/mensajes';
import { Router } from '@angular/router';
import { ProgressBarService } from '../_service/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private mensajes: Mensajes,
    private router: Router,
    private barraProgreso: ProgressBarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(environment.REINTENTOS)).
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error === true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }
        }
      })).pipe(catchError((err) => {
        this.barraProgreso.progressBarReactiva.next(true);
        console.log(err);
        if (err.error.status == 400) {
          this.mensajes.openSnackBar(err.error.message);
        } else if (err.status == 401) {
          if (err.error.message == 'No estas autorizado para acceder a este recurso') {
            this.router.navigate(['unauthorized']);
            this.mensajes.openSnackBar(err.error.message);
          }
          if (err.error.error_description == 'Bad credentials') {
            this.mensajes.openSnackBar('Clave incorrecta');
          }
          if (err.error.error_description == '----Nick o password incorecto') {
            this.mensajes.openSnackBar('Nick Incorecto');
          }
          if (err.error.error === 'invalid_token') {

            this.mensajes.openSnackBar('Token inválido');
            sessionStorage.clear();
            this.router.navigate(['unauthorized']).then(() => { window.location.reload(); });

          }
        } else if (err.status == 400) {
          if (err.error.error_description == 'Bad credentials') {
            this.mensajes.openSnackBar('Datos erróneos');
          }
        } else if (err.error.status == 404) {
          this.mensajes.openSnackBar(err.error.message);
        } else if (err.error.status == 405) {
          this.router.navigate(['notAllowed']);
          this.mensajes.openSnackBar(err.error.message);
        } else if (err.error.status == 415) {
          this.mensajes.openSnackBar(err.error.message);
        } else if (err.error.status == 500) {
          this.mensajes.openSnackBar('Acceso Denegado');
          this.router.navigate(['error']);
        }

        return EMPTY;
      }));

  }

  private guardarLog(console: any) {
    var fs = require('fs')
    var logger = fs.createWriteStream('../_log/errores.txt', {
      flags: 'a'
    })

    logger.write(console);
  }
}