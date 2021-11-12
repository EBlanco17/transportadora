import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/Usuario'
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface UsuarioData {
  paginator: any;
  content: Usuario[],
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

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.HOST}/usuarios`;
  private _refresh$ = new Subject<void>();
  
  get refresh$(){
    return this._refresh$;
  }
    constructor(private http: HttpClient){}

    public listar(id : number) {
      return this.http.get(`${this.url}/listar/`+ id);
    }

    listarPaginado ( page: number,size: number):Observable<UsuarioData>{
      //return this.http.get(`${this.url}/pageablePorRol/4/page/size`);
        return this.http.get(`${this.url}/pageablePorRol/`+ 4 + `/` + page + `/` + size).pipe(
        map((u: any, UsuarioData)=>u),
        catchError(err=>throwError(err))
      );
    }

    public guardar(usuario: Usuario){
      return this.http.post(`${this.url}/guardar`, usuario).pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
    }

    public editar(usuario: Usuario){
      return this.http.put(`${this.url}/editar`, usuario).pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
    }
    public eliminar(id : number){
      return this.http.delete(`${this.url}/eliminar/`+ id).pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
    }


    //Conductores asociados al vehiculo
    public listarConductorVehiculo(idVeh : number) {
      return this.http.get(`${this.url}/listarConductorVehiculo/`+ idVeh);
    }    

    //Conductores no asociados al vehiculo
    public listarConductorNoVehiculo(idVeh : number) {
      return this.http.get(`${this.url}/listarConductorNoVehiculo/`+ idVeh);
    } 

    public desasociarconductor(idUsuario : number, idVehiculo : number){
      let params = new HttpParams();
      params=params.append('idUsuario',String(idUsuario));
      params=params.append('idVehiculo',String(idVehiculo));
      return this.http.post(this.url+'/desasociarconductor',{params});

    }


}
