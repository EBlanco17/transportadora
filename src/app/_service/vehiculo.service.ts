import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehiculo} from '../_model/Vehiculo';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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


@Injectable({
    providedIn: 'root'
  })

export class VehiculoService{

  private url: string = `${environment.HOST}/vehiculos`;

  constructor(private http: HttpClient){}
  public guardar(vehiculo: Vehiculo){
    return this.http.post(`${this.url}/guardar`, vehiculo);
  }
  public listar() {
    return this.http.get<Vehiculo[]>(`${this.url}/listar`);
  }

  listarPaginado ( page: number,size: number):Observable<VehiculoData>{
    //return this.http.get(`${this.url}/pageable/?page=${page}&size=${size}`);
    let params = new HttpParams();
    params=params.append('page',String(page));
    params=params.append('size',String(size));
    return this.http.get(this.url+'/pageable',{params}).pipe(
      map((v: any, VehiculoData)=>v),
      catchError(err=>throwError(err))
    );
  }
  public editar(vehiculo: Vehiculo){
    return this.http.put(`${this.url}/editar`, vehiculo);
  }
 
}

