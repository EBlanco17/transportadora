import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
@Component({
  selector: 'app-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.css']
})
export class CamionComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {

    let vehiculo: Vehiculo = new Vehiculo();
    
    this.vehiculoService.guardar(vehiculo).subscribe(data =>{
      console.log("Se registro vehiculo");
  });

  this.vehiculoService.listarPaginado(0,3).subscribe(data =>{
    console.log(data);
      
  })
  }

}
