import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Mensajes {

  constructor(private snackBar: MatSnackBar) { }
  
  public openSnackBar(mensaje: string) {
    if(mensaje.startsWith('----')){
      mensaje = mensaje.slice(4);
    }
    this.snackBar.open(mensaje, 'X', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
