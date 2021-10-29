import { Component, OnInit } from '@angular/core';
import { LoginService } from './_service/login.service';
import { ProgressBarService } from './_service/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public flagProgressBar: boolean = true;
  constructor(private barraProgreso: ProgressBarService,private loginService:LoginService){}


  public log!: boolean;

  ngOnInit(): void {
    this.barraProgreso.progressBarReactiva.subscribe(data =>{
        //this.flagProgressBar = data;  
        this.flagProgressBar = !this.flagProgressBar;
    });
    this.log=this.loginService.estaLogeado();
  }
  public cerrarSesion(): void{
    this.loginService.closeSession();
  }
}
