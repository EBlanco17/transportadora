import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table/public-api';
import { Ciudades } from 'src/app/_model/Ciudades';
import { Departamento } from 'src/app/_model/Departamento';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  
  carga: boolean = false;
 
  displayedColumns: string[] = ['idDepartamento', 'nombre', 'Ciudades'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  list: Departamento[] = [];
  dataSourse=this.list;


  
  displayedColumns2: string[] = ['idCiudad', 'nombre'];
  columnsToDisplay2: string[] = this.displayedColumns2.slice();
  list22: Ciudades[] = [];
  dataSourse2=this.list22;
  

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.carga=true;

    this.list=[];
    this.departamentoService.listar().subscribe(data=>{
        data.forEach(element => {
        this.list.push({idDepartamento: element.idDepartamento, nombre: element.nombre});
        //console.log(`Código: ${element.idDepartamento} - Nombre ${element.nombre}`);
        //console.log('Codigo: '+element.idDepartamento+'  -  Nombre: '+element.nombre);
      });
      this.dataSourse = this.list;

      if (!this.dataSourse) {
        alert('error al cargar');
      }else{
        this.carga=false;
      }
    });
  }


  public nuevaTabla(num: number){
    this.carga=true;
    //console.log(num);
    this.departamentoService.listarCiudades(num).subscribe(data=>{
      data.forEach(element => {
         this.list22.push({idCiudad: element.idCiudad, nombre: element.nombre});
      });
      //console.log(data);
      this.dataSourse2 = this.list22;

      if (!this.dataSourse) {
        alert('error al cargar');
      }else{
        this.carga=false;
      }
    });
    this.dataSourse2 = [];
    this.list22 = [];
  }
}
