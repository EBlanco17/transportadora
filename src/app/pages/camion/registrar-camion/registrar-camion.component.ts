import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-camion',
  templateUrl: './registrar-camion.component.html',
  styleUrls: ['./registrar-camion.component.css']
})
export class RegistrarCamionComponent implements OnInit {
  form!: FormGroup;

  vehicle: Vehiculo = new Vehiculo();
selectedTipo !: string;
selectedMarca !: string;
  veh: any;

  constructor(private VehService: VehiculoService, private formBuilder: FormBuilder, 
              public errorInterceptor: ErrorInterceptorService, private router: Router, 
              private route: ActivatedRoute) {
      this.buildForm();
    }

  ngOnInit(): void {
  }

  nuevoVehiculo(event: Event): void{
    event.preventDefault();

    const v: Vehiculo = new Vehiculo();

    v.placa = this.form.value.placa;
    v.marca = this.form.value.marca;
    v.modelo = this.form.value.modelo;
    v.tipoVehiuclo = this.form.value.tipoVehiculo;
    v.capacidad = this.form.value.capacidad;

    if (this.form.valid)
    {
      this.VehService.guardar(v).subscribe(success => {
        console.log(success);
        this.form.reset();
        this.router.navigate(['/camion']);
      }, err => {
        console.log(err);
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void{
    this.form = this.formBuilder.group(
      {
        idVehiculo: ['', []],
        placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
        marca: ['', [Validators.required]],
        modelo: ['', [Validators.required, Validators.min(1970), Validators.max(2022)]],
        tipoVehiculo: ['', [Validators.required]],
        capacidad: ['', [Validators.required]],
      });

  }
}
