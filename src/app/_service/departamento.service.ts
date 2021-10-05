import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ciudades } from '../_model/Ciudades';
import { Departamento } from '../_model/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  url:string=`${environment.HOST}/departamentos`;

  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Departamento[]>(`${this.url}/listar`);
  }
  public listarCiudades(idDpt: number){
    return this.http.get<Ciudades[]>(`${this.url}/ciudad/listarPorDepartamnto/${idDpt}`);
  }
}
