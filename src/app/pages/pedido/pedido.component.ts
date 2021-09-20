import { Component, OnInit } from '@angular/core';
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


  public nuevaTabla(num: number):void{
    this.carga=true;
    console.log(num);
  }
}
