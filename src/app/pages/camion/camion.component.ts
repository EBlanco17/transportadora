import { Component,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoData, VehiculoService } from 'src/app/_service/vehiculo.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.css']
})
export class CamionComponent implements OnInit {

  dataSource!: VehiculoData;
  displayedColumns: string[] = ['idVehiculo', 'placa', 'modelo','marca','tipoVehiuclo','capacidad','editar'];
  ListaVehiculos= new MatTableDataSource<Vehiculo>([]);
  pageEvent!: PageEvent;
  pageSizeOptions!: number[];
 
  @ViewChild(MatPaginator, {static:true})paginator!:MatPaginator;
  @ViewChild(MatSort,{static: true}) sort!: MatSort;
  
  constructor(private vehiculoService: VehiculoService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    //let vehiculo: Vehiculo = new Vehiculo();
    
    /*this.vehiculoService.guardar(vehiculo).subscribe(data =>{
      console.log("Se registro vehiculo");
    });*/

    this.vehiculoService.listarPaginado(0,5).pipe(
      tap(vehiculo=>console.log(vehiculo)),
      map((v:VehiculoData)=>this.dataSource=v)
    ).subscribe(data=>{
      this.dataSource.paginator=this.paginator;
    });
  }


  onPageChange(event:PageEvent){
    let page=event.pageIndex;
    let size=event.pageSize;
    this.vehiculoService.listarPaginado(page,size).pipe(
      map((v:VehiculoData)=>this.dataSource=v)
    ).subscribe();
    console.log(page);
  }

}
