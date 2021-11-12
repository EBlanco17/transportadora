import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { RegistrarConductorComponent } from './pages/conductor/registrar-conductor/registrar-conductor.component';
import { EditarConductorComponent } from './pages/conductor/editar-conductor/editar-conductor.component';
import { CamionComponent } from './pages/camion/camion.component';
import { RegistrarCamionComponent } from './pages/camion/registrar-camion/registrar-camion.component';
import { EditarCamionComponent } from './pages/camion/editar-camion/editar-camion.component';
import { ErrorInterceptorService } from './_share/error-interceptor.service';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { UbicarComponent } from './pages/ubicar/ubicar.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/departamento/ciudad/ciudad.component';
import { environment } from 'src/environments/environment';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { NoPermitidoComponent } from './pages/no-permitido/no-permitido.component';
import { InactividadDialogComponent } from './pages/inactividad-dialog/inactividad-dialog.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UbicarComponent,
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
    NoPermitidoComponent,
    UsuarioComponent,
    RegistrarConductorComponent,
    EditarConductorComponent,
    InactividadDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["159.223.107.103:8080"],
        disallowedRoutes: ["http://159.223.107.103:8080/movitapp-backend/oauth/token"],
      },
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
