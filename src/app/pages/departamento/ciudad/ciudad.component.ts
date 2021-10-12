import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ciudades } from 'src/app/_model/Ciudades';
import { DepartamentoService } from 'src/app/_service/departamento.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  displayedCityColumns: string[] = ['codigo', 'nombre'];
  dataSourceCiudad = new MatTableDataSource<Ciudades>();

  @ViewChild("cityPaginator") citiyPaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private departamentoService: DepartamentoService,
              private router: Router,
              public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) =>{
        let idDepartamento = params['idDep'];

        this.departamentoService.listarCiudades(idDepartamento).subscribe(data =>{
          this.dataSourceCiudad = new MatTableDataSource(data);
          this.dataSourceCiudad.paginator = this.citiyPaginator;
          this.dataSourceCiudad.sort = this.sort;
        });

    });

  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceCiudad.filter = filtro.trim().toLowerCase();
  } 
}
