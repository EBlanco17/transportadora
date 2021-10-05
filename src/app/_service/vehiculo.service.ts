import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehiculo} from '../_model/Vehiculo';

@Injectable({
    providedIn: 'root'
  })

  export class VehiculoService{

    private url: string = `${environment.HOST}/vehiculos`;

    constructor(private http: HttpClient){}
    public guardar(vehiculo: Vehiculo){
        return this.http.post(`${this.url}/guardar`, vehiculo);
    }
  }