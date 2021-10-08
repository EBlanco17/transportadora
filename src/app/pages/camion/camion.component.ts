import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoData, VehiculoService } from 'src/app/_service/vehiculo.service';
@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.css']
})
export class CamionComponent implements OnInit {

  dataSource!: VehiculoData;
  displayedColumns: string[] = ['idVehiculo', 'placa', 'modelo','marca','tipoVehiuclo','capacidad'];

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {

    //let vehiculo: Vehiculo = new Vehiculo();
    
    /*this.vehiculoService.guardar(vehiculo).subscribe(data =>{
      console.log("Se registro vehiculo");
    });*/

    this.vehiculoService.listarPaginado(10,0).pipe(
      tap(vehiculo=>console.log(vehiculo)),
      map((v:VehiculoData)=>this.dataSource=v)
    ).subscribe();

  }

}
