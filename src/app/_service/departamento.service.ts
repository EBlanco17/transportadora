import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departamento } from '../_model/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  url1:string=environment.HOST+'/departamentos';
  url12:string='${environment.HOST}/departamentos';

  constructor(private http: HttpClient) { }

  public listar(){
    return this.http.get<Departamento[]>(this.url1+'/listar');
  }
  public listarCiudades(num: number){
    return this.http.get<Departamento[]>(this.url1+'/ciudad/listarPorDepartamnto/'+num);
  }
}
