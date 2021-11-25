import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehiculo} from '../_model/Vehiculo';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { isNull } from '@angular/compiler/src/output/output_ast';

export interface VehiculoData {
  paginator: any;
  content: Vehiculo[],
  pageable:{
    sort:{
      sorted:boolean,
      unsorted:boolean,
      empty:boolean
    },
    pageNumber:number,
    pageSize:number,
    offset:number,
    unpaged:boolean,
    paged:boolean
  }
  totalPages: number,
  totalElements: number,
  last: boolean,
  sort: {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
  },
  first: boolean,
  numberOfElements:number ,
  size: number,
  number: number,
  empty: boolean
}
export interface Asociados{
  idUsuario: number,
  documento: any,
  nombre: string,
  apellido: string,
  nick: any,
  clave: any,
  estado: any,
  cambioContrasena: any,
  nombreEmpresa: any,
  direccion: any,
  cargo: any,
  telefono: any,
  celular: any,
  correo: any,
  tipoDocumento: any,
  rol: any,
  ciudad: any,
  vehicuo: any
}

@Injectable({
    providedIn: 'root'
  })

export class VehiculoService{

  private url: string = `${environment.HOST}/vehiculos`;
  private _refresh$ = new Subject<void>();

  get refresh$(){
  return this._refresh$;
}
  constructor(private http: HttpClient){}

  public guardar(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/guardar`, vehiculo).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  public listar(id : number) {
    return this.http.get(`${this.url}/listar/`+ id);
  }

  listarPaginado ( page: number,size: number):Observable<VehiculoData>{
    //return this.http.get(`${this.url}/pageable/?page=${page}&size=${size}`);
    let params = new HttpParams();
    params=params.append('page',String(page));
    params=params.append('size',String(size));
    return this.http.get(this.url+'/pageable',{params}).pipe(
      map((v: any, VehiculoData )=>v),
      catchError(err=>throwError(err))
    );
  }
  public editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`, vehiculo).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
 

  public desasociarconductor(idUsuario : number, idVehiculo : number){
    
    return this.http.post(`${this.url}/desasociarconductor/${idUsuario}/${idVehiculo}`, null).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );

  }
  public asociarconductor(idUsuario : number, idVehiculo : number){
    
    return this.http.post(`${this.url}/asociarcondcutor/${idUsuario}/${idVehiculo}`, null).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );

  }
}

