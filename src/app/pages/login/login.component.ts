import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { environment } from 'src/environments/environment';

import { ErrorInterceptorService } from 'src/app/_share/error-interceptor.service';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  user!: string;
  password!:string;

  constructor(private loginService:LoginService,private formBuilder: FormBuilder,
    public errorInterceptor: ErrorInterceptorService,private router: Router,) 
  { this.buildForm();}

  ngOnInit(): void {
    if(this.loginService.estaLogeado()){
      this.redireccionar();
    }
  }
  public iniciar(event: Event){
    event.preventDefault();
    if (this.form.valid)
    {
      this.loginService.login(this.form.value.user,this.form.value.password).subscribe(data =>{
        sessionStorage.setItem(environment.TOKEN,data.access_token);
        this.redireccionar();
      });
    }else{
      this.form.markAllAsTouched();
    }
    /*this.loginService.login('admin','123456').subscribe(data =>{
      //console.log(data);
      //localStorage
      const helper = new JwtHelperService();
 
      const decodedToken = helper.decodeToken(data.access_token);
      const expirationDate = helper.getTokenExpirationDate(data.access_token);
      const isExpired = helper.isTokenExpired(data.access_token);

      sessionStorage.setItem(environment.TOKEN,data.access_token);
    });*/
  }

  private redireccionar(){
    if(this.loginService.rol() == "Administrador"){
      this.router.navigate(['/ubicar']).then(() => { window.location.reload(); });
    }else{
      this.router.navigate(['/usuario']).then(() => { window.location.reload(); });
    }
  }

  private buildForm(): void{
    this.form = this.formBuilder.group(
      {
        user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]] 
      });

  }

}
