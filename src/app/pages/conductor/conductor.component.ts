import { Component, AfterViewInit, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/_model/Usuario';
import { UsuarioData, UsuarioService } from 'src/app/_service/usuario.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProgressBarService } from 'src/app/_service/progress-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit, OnDestroy {
  dataSource!: UsuarioData;
  displayedColumns: string[] = ['idUsuario', 'documento', 'nombre', 'nick', 'celular', 'correo', 'ciudad', 'direccion', 'acciones'];
  ListaConductores = new MatTableDataSource<Usuario>([]);
  pageEvent!: PageEvent;
  pageSizeOptions!: number[];
  susbcription !: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private usuarioService: UsuarioService, public route: ActivatedRoute,
    private barraProgreso: ProgressBarService) { }

  ngOnInit() {
    this.getConductores();
    this.susbcription = this.usuarioService.refresh$.subscribe(() => {
      this.getConductores();
    });
  }
  ngOnDestroy() {
    this.susbcription.unsubscribe();
    console.log("observable cerrado");
  }
  getConductores(): void {
    this.barraProgreso.progressBarReactiva.next(false);
    //await new Promise(f => setTimeout(f, 5000));
    this.usuarioService.listarPaginado(0, 5).pipe(
      tap(vehiculo => console.log(vehiculo)),
      map((u: UsuarioData) => this.dataSource = u)
    ).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.barraProgreso.progressBarReactiva.next(true);
      this.ListaConductores = new MatTableDataSource(data.content);
      this.ListaConductores.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.ListaConductores.filter = filtro.trim().toLowerCase();
  }

  onPageChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    this.usuarioService.listarPaginado(page, size).pipe(
      map((u: UsuarioData) => this.dataSource = u)
    ).subscribe(data => {
      this.dataSource.paginator = this.paginator;
      this.barraProgreso.progressBarReactiva.next(true);
      this.ListaConductores = new MatTableDataSource(data.content);
      this.ListaConductores.sort = this.sort;
    });
  }

  eliminarConductor(idUser: number): void {
    console.log(idUser);
    this.usuarioService.eliminar(idUser).subscribe();
  }
}
