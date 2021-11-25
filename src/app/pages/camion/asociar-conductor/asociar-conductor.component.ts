import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/_model/Usuario';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { Mensajes } from 'src/app/_share/mensajes';

@Component({
  selector: 'app-asociar-conductor',
  templateUrl: './asociar-conductor.component.html',
  styleUrls: ['./asociar-conductor.component.css']
})
export class AsociarConductorComponent implements OnInit {

  condAsociados: Usuario[] = [];
  displayedColumns: string[] = ['idUsuario', 'nombre', 'apellido', 'documento', 'eliminar'];
  dataSource: any;
  listaConductor = new MatTableDataSource([]);
  pageEvent!: PageEvent;
  pageSizeOptions!: number[];
  susbcription !: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  form!: FormGroup;
  veh: any;
  public selectedTipo: any;
  public selectedMarca!: string;
  idVehiculo: number = 0;

  public hablilitar: boolean = true;

  constructor(
    private vehiculoService: VehiculoService,
    public usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    public errorInterceptor: ErrorInterceptorService,
    private router: Router,
    private route: ActivatedRoute,
    private mensaje: Mensajes,
    private barraProgreso: ProgressBarService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idVehiculo = params.idCamion;
      this.cargarVehiculo(this.idVehiculo);


      this.getNoAsociados();
      this.susbcription = this.vehiculoService.refresh$.subscribe(() => {
        this.getNoAsociados();
      });
    });

  }

  //parte vehiculo
  cargarVehiculo(idVehiculo: number): void {
    this.vehiculoService.listar(idVehiculo).subscribe(data => {
      this.veh = data;
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        idVehiculo: ['', []],
        placa: ['', []],
        marca: ['', []],
        modelo: ['', []],
        tipoVehiculo: ['', []],
        capacidad: ['', []],
      });

  }


  //parte conductores
  getNoAsociados() {
    this.barraProgreso.progressBarReactiva.next(false);
    this.usuarioService.listarConductorNoVehiculo(this.idVehiculo).subscribe(data => {
      this.dataSource = data;
      this.dataSource.sort = this.sort;
      this.barraProgreso.progressBarReactiva.next(true);
    });
  }

  asociar(idUsuario: number) {
    this.vehiculoService.asociarconductor(idUsuario, this.idVehiculo).subscribe(success => {
      this.mensaje.openSnackBar('Conductor asociado');
    }, err => {
      this.mensaje.openSnackBar('Error al asociar conductor, intente mas tarde');
    });
  }

}
