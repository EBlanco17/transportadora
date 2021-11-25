import { Component, AfterViewInit, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoData, VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VerUsersComponent } from './ver-users/ver-users.component';

@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.css']
})
export class CamionComponent implements OnInit, OnDestroy{

  dataSource!: VehiculoData;
  displayedColumns: string[] = ['idVehiculo', 'placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'editar','conductores'];
  ListaVehiculos = new MatTableDataSource<Vehiculo>([]);
  pageEvent!: PageEvent;
  pageSizeOptions!: number[];
  susbcription !: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  idCarro!: number;
  placa!: string;


  constructor(
    private vehiculoService: VehiculoService, 
    public route: ActivatedRoute,
    private barraProgreso: ProgressBarService, 
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getVehiculos();
    this.susbcription = this.vehiculoService.refresh$.subscribe(() => {
      this.getVehiculos();
    });
  }

  ngOnDestroy(){
    this.susbcription.unsubscribe();
  }

  getVehiculos(): void {
    this.barraProgreso.progressBarReactiva.next(false);
    //await new Promise(f => setTimeout(f, 5000));
    this.vehiculoService.listarPaginado(0, 5).pipe(
      //tap(vehiculo => console.log(vehiculo)),
      map((v: VehiculoData) => this.dataSource = v)
    ).subscribe(data => {
      this.dataSource.paginator = this.paginator;

      this.barraProgreso.progressBarReactiva.next(true);
      this.ListaVehiculos = new MatTableDataSource(data.content);
      this.ListaVehiculos.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.ListaVehiculos.filter = filtro.trim().toLowerCase();
  }

  onPageChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    this.vehiculoService.listarPaginado(page, size).pipe(
      map((v: VehiculoData) => this.dataSource = v)
    ).subscribe(data => {
      this.dataSource.paginator = this.paginator;

      this.barraProgreso.progressBarReactiva.next(true);
      this.ListaVehiculos = new MatTableDataSource(data.content);
      this.ListaVehiculos.sort = this.sort;
    });
  }

  openDialog(num: number,placa:string,marca:string,tipoVeh:string,capacidad:string): void {
    let vehiculo = new Vehiculo();
    vehiculo.idVehiculo=num;
    vehiculo.placa=placa;
    vehiculo.marca=marca;
    vehiculo.tipoVehiuclo=tipoVeh;
    vehiculo.capacidad=capacidad;
    const dialogRef = this.dialog.open(VerUsersComponent, {
      width: '1000px',
      //data: {idCarro: this.idCarro, placa: this.placa}
      data: vehiculo
    });
  }
}
/*
@ViewChild(MatSort) sort: MatSort;
ngOnInit(): void{
  this.vehicleList.sort = this.sort;
}
public onPaginateChange(even: PageEvent){
  this.vehicleList.sort = this.sort;
}
public doFilter = (value: string) => {
    this.vehicleList.filter = value.trim().toLocaleLowerCase();
  }
*/
