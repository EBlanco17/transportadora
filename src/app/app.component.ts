import { Component, OnInit } from '@angular/core';
import { LoginService } from './_service/login.service';
import { ProgressBarService } from './_service/progress-bar.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { InactividadDialogComponent } from './pages/inactividad-dialog/inactividad-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flagProgressBar: boolean = true;
  timedOut = false;
  lastPing?: Date;
  public flagDialog : boolean = true;
  constructor(private barraProgreso: ProgressBarService, public loginService: LoginService,
    private idle: Idle, private keepalive: Keepalive, private router: Router, public dialog: MatDialog) {
    this.inactividad();
  }

  inactividad(){
    if (this.loginService.estaLogeado()) {
      this.idle.setIdle(10*60); //tiempo de inactividad en minutos
      this.idle.setTimeout(5*60); //tiempo añadido que tiene el usuario cuando se acabe el tiempo de inactividad
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      this.idle.onIdleEnd.subscribe(() => {
        this.reset();
      });

      this.idle.onTimeout.subscribe(() => {
        this.timedOut = true;
        this.loginService.closeSesion();
        this.openDialog();
      });

      this.keepalive.interval(15);
      this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
      this.reset();
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(InactividadDialogComponent, {
     width: '30%'
   });
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
    if(confirm("Desea salir del aplicativo?")){
      this.loginService.closeSession();
    }
  }
}
