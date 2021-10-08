import { Component, OnInit } from '@angular/core';
import {ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';

@Component({
  selector: 'app-camiones',
  templateUrl: './camiones.component.html',
  styleUrls: ['./camiones.component.css']
})
export class CamionesComponent implements OnInit {
  
  displayedColumns: string[] = ['idVehiculo', 'placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad'];
  dataSource = new MatTableDataSource<Vehiculo>();
  
  @ViewChild("DepartmentPaginator") paginator!: MatPaginator;

  constructor(private vehiculoService : VehiculoService, 
    public route: ActivatedRoute) { }

  ngOnInit(): void {
   /* this.vehiculoService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
  });*/

  this.vehiculoService.listarPaginado(0,5).subscribe(data =>{
      this.dataSource.paginator = this.paginator;
      console.log(data);
      
  })
  }

}
