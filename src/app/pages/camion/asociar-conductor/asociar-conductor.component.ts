import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from 'src/app/_model/Usuario';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { Mensajes } from 'src/app/_share/mensajes';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-asociar-conductor',
  templateUrl: './asociar-conductor.component.html',
  styleUrls: ['./asociar-conductor.component.css']
})
export class AsociarConductorComponent implements OnInit {

  displayedColumns: string[] = ['idUsuario', 'nombre', 'apellido', 'documento', 'eliminar'];
  dataSource : any;

  @ViewChild("ConductoresPaginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  veh: any;
  idVehiculo: number = 0;

  constructor(
    private vehiculoService: VehiculoService,
    public usuarioService: UsuarioService,
    public errorInterceptor: ErrorInterceptorService,
    private route: ActivatedRoute,
    private mensaje: Mensajes,
    private barraProgreso: ProgressBarService
  ) {
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idVehiculo = params.idCamion;
      this.cargarVehiculo(this.idVehiculo);
      this.getNoAsociados();
    });
  }

  //parte vehiculo
  cargarVehiculo(idVehiculo: number): void {
    this.vehiculoService.listar(idVehiculo).subscribe(data => {
      this.veh = data;
    });
  }

   //parte conductores
  getNoAsociados() {
    this.barraProgreso.progressBarReactiva.next(false);
    this.usuarioService.listarConductorNoVehiculo(this.idVehiculo).subscribe(data  => {
      this.dataSource = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.barraProgreso.progressBarReactiva.next(true);
    });
  }

  asociar(idUsuario: number) {
    this.vehiculoService.asociarconductor(idUsuario, this.idVehiculo).subscribe(success => {
      this.mensaje.openSnackBar('Conductor asociado');
      this.getNoAsociados();
    }, err => {
      this.mensaje.openSnackBar('Error al asociar conductor, intente mas tarde');
    });
  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
}
