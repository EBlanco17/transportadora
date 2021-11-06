import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_model/Usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-conductor',
  templateUrl: './registrar-conductor.component.html',
  styleUrls: ['./registrar-conductor.component.css']
})
export class RegistrarConductorComponent implements OnInit {

  form!: FormGroup;
  selectedDepto !: string;
  selectedCity !: string;
  
  constructor(private userService: UsuarioService, private formBuilder: FormBuilder, 
    public errorInterceptor: ErrorInterceptorService, private router: Router, 
    private route: ActivatedRoute) {
      this.buildForm();
     }

  ngOnInit(): void {
  }

  nuevoUsuario(event: Event): void{
    event.preventDefault();

    const u: Usuario = new Usuario();

    u.nombre = this.form.value.nombre;
    u.apellido = this.form.value.apellido;
    u.nick = this.form.value.nick;
    u.documento = this.form.value.documento;
    u.correo = this.form.value.correo;
    u.clave = this.form.value.clave;
    u.direccion = this.form.value.direccion;
    u.celular = this.form.value.celular;
    u.celularAux = this.form.value.celularAux;
    u.tipoDocumento.idTipoDocumento = 1;
    u.rol.idRol = 4;
    u.ciudad.idCiudad = 1;

    if (this.form.valid)
    {
      this.userService.guardar(u).subscribe(success => {
        console.log(success);
        this.form.reset();
        this.router.navigate(['/conductor']);
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
        idUsuario: ['', []],
        nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20),Validators.pattern(/^[a-zA-Z]+$/)]],
        apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20),Validators.pattern(/^[a-zA-Z]+$/)]],
        nick: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        documento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)]],
        correo: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/)]],
        clave: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
        direccion: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[0-9]+$/) ]],
        celularAux: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[0-9]+$/)]],
      
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
