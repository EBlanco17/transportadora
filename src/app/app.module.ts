import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent} from './pages/login/login.component';
import { EditarComponent } from './pages/editar/editar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { CamionComponent } from './pages/camion/camion.component';

import { EditarCamionComponent } from './pages/camion/editar-camion/editar-camion.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { RegistrarCamionComponent } from './pages/camion/registrar-camion/registrar-camion.component';
import { ErrorInterceptorService } from './_share/error-interceptor.service';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { NoPermitidoComponent } from './pages/no-permitido/no-permitido.component';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';


export function tokenGetter() {
  let tk=sessionStorage.getItem(environment.TOKEN);
  return tk != null ? tk:'';
}

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EditarComponent,
    PerfilComponent,
    PedidoComponent,
    ConductorComponent,
    CamionComponent,
    EditarCamionComponent,
    NotFoundComponent,
    NotOkComponent,
    RegistrarCamionComponent,
    NotAllowedComponent,
    DepartamentoComponent,
    CiudadComponent,
    NoPermitidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://159.223.107.103:8080/movitapp-backend/oauth/token"],
      },
    }),
    
  ],
  providers: [
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi:    true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
