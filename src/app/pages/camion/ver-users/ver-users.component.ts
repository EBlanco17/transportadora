import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/_model/Usuario';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { Asociados, VehiculoService } from 'src/app/_service/vehiculo.service';
import { Mensajes } from 'src/app/_share/mensajes';

@Component({
  selector: 'app-ver-users',
  templateUrl: './ver-users.component.html',
  styleUrls: ['./ver-users.component.css']
})
export class VerUsersComponent implements OnInit {
  
  condAsociados: Usuario[] = [];
  displayedColumns: string[] = ['idUsuario', 'nombre', 'apellido', 'eliminar'];
  dataSource :any;
  listaConductor = new MatTableDataSource([]);
  pageEvent!: PageEvent;
  pageSizeOptions!: number[];
  susbcription !: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<VerUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Vehiculo ,
    private vehiculoService: VehiculoService,
    public usuarioService: UsuarioService,
    private mensaje : Mensajes,
    private barraProgreso: ProgressBarService
  ) { }

  ngOnInit(): void {
    this.getAsociados();
    this.susbcription = this.vehiculoService.refresh$.subscribe(() => {
      this.getAsociados();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAsociados(){
    
    this.barraProgreso.progressBarReactiva.next(false);
    this.usuarioService.listarConductorVehiculo(this.data.idVehiculo).subscribe(data =>{
      this.dataSource=data;
      this.dataSource.sort = this.sort;
      this.barraProgreso.progressBarReactiva.next(true);
    });
  }

  public desasociar(idUsuario:number,idVehiculo:number): void{
    if(confirm("Desea desasociar este conductor?")){
    this.vehiculoService.desasociarconductor(idUsuario,idVehiculo).subscribe(success => {
      this.mensaje.openSnackBar('Conductor desasociado');
    }, err => {
      this.mensaje.openSnackBar('Error al desasociar conductor, intente mas tarde');
    });
  }
}
}
