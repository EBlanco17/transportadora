import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditarCamionComponent } from './pages/camion/editar-camion/editar-camion.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotOkComponent } from './pages/not-ok/not-ok.component';
import { RegistrarCamionComponent } from './pages/camion/registrar-camion/registrar-camion.component';
import { ErrorInterceptorService } from './_share/error-interceptor.service';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
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
    NotAllowedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
    
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
