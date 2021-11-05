import { Component, OnInit } from '@angular/core';
import { LoginService } from './_service/login.service';
import { ProgressBarService } from './_service/progress-bar.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flagProgressBar: boolean = true;
  timedOut = false;
  lastPing?: Date;
  title = 'angular-idle-timeout';
  constructor(private barraProgreso: ProgressBarService, private loginService: LoginService,
    private idle: Idle, private keepalive: Keepalive, private router: Router) {
    if (loginService.estaLogeado()) {
      idle.setIdle(15*60); //tiempo de inactividad en segundos
      idle.setTimeout(5); //tiempo añadido que tiene el usuario cuando se acabe el tiempo de inactividad
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => {
        this.reset();
      });

      idle.onTimeout.subscribe(() => {
        this.timedOut = true;
        loginService.closeSession();
      });

      keepalive.interval(15);
      keepalive.onPing.subscribe(() => this.lastPing = new Date());
      this.reset();
    }
  }
  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  public log!: boolean;

  ngOnInit(): void {
    this.barraProgreso.progressBarReactiva.subscribe(data => {
      this.flagProgressBar = data;
      //this.flagProgressBar = !this.flagProgressBar;
    });
    this.log = this.loginService.estaLogeado();
  }
  public cerrarSesion(): void {
    this.loginService.closeSession();
  }
}
