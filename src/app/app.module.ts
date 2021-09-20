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
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    EditarComponent,
    PerfilComponent,
    PedidoComponent,
    ConductorComponent,
    CamionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
