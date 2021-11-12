import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-inactividad-dialog',
  templateUrl: './inactividad-dialog.component.html',
  styleUrls: ['./inactividad-dialog.component.css']
})
export class InactividadDialogComponent implements OnInit {

  constructor(private loginService : LoginService, private router:Router) { }

  ngOnInit(): void {
  }
cerrar(){
  this.router.navigate(['/login']).then(() => { window.location.reload(); });
}
}
