import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { VehiculoService } from 'src/app/_service/vehiculo.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/_share/mensajes';
@Component({
  selector: 'app-registrar-camion',
  templateUrl: './registrar-camion.component.html',
  styleUrls: ['./registrar-camion.component.css']
})
export class RegistrarCamionComponent implements OnInit {
  form!: FormGroup;

  vehicle: Vehiculo = new Vehiculo();
  selectedTipo !: string;
  placa !: string;
  placa2 !: string;
  selectedMarca !: string;
  veh: any;

  constructor(private VehService: VehiculoService, private formBuilder: FormBuilder, 
              public errorInterceptor: ErrorInterceptorService, private router: Router, 
              private route: ActivatedRoute, private mensaje : Mensajes) {
      this.buildForm();
    }

  ngOnInit(): void {
  }

  nuevoVehiculo(event: Event): void{
    event.preventDefault();

    const v: Vehiculo = new Vehiculo();

    v.placa = this.form.value.placa+"-"+this.form.value.placa2;
    v.marca = this.form.value.marca;
    v.modelo = this.form.value.modelo;
    v.tipoVehiuclo = this.form.value.tipoVehiculo;
    v.capacidad = this.form.value.capacidad + "Kg";
    if (this.form.valid)
    {
      this.VehService.guardar(v).subscribe(success => {
        this.mensaje.openSnackBar('Vehiculo registrado');
        this.form.reset();
        this.router.navigate(['/camion']);
      }, err => {
        this.mensaje.openSnackBar('Error al registrar vehiculo, intente mas tarde');
      });
    }else{
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): void{
    this.form = this.formBuilder.group(
      {
        idVehiculo: ['', []],
        placa: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern(/^[a-zA-Z]+$/)]],
        placa2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern(/^[0-9]+$/)]],
        marca: ['', [Validators.required]],
        modelo: ['', [Validators.required, Validators.min(1970), Validators.max(2022)]],
        tipoVehiculo: ['', [Validators.required]],
        capacidad: ['', [Validators.required]],
      });

  }
  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }
  public inputValidatorNum(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      // invalid character, prevent input

    }
  }
}
