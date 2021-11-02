import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../_service/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate{

  constructor(private loginService: LoginService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.loginService.estaLogeado()==true){
      const helper = new JwtHelperService();

      let token: any =sessionStorage.getItem(environment.TOKEN);

      if(!helper.isTokenExpired(token)){
        const decodedToken = helper.decodeToken(token);
        const rol: string=decodedToken.authorities[0];
        const url: string=state.url;
        console.log(rol);
        console.log(url);

        if(rol=="Administrador"&&url.includes('perfil')){
          return true;
        }else if(rol=="Administrador"&&url.includes('pedido')){
          return true;
        }else if(rol=="Administrador"&&url.includes('conductor')){
          return true;
        }else if(rol=="Administrador"&&url.includes('camion')){
          return true;
        }else if(rol=="Administrador"&&url.includes('registrar-camion')){
          return true;
        }else if(rol=="Administrador"&&url.includes('editar-camion/:idCamion')){
          return true;
        }else if(rol=="Administrador"&&url.includes('departamento')){
          return true;
        }else if(rol=="Administrador"&&url.includes('ciudad/:idDep')){
          return true;
        }else if(rol=="Administrador"&&url.includes('editar')){
          return true;
        }else if(rol=="Administrador"&&url.includes('usuario')){
          return true;
        }else {
          this.loginService.closeSession();
          return false;
        }
        return true;
      }else{
        this.loginService.closeSession();
        return false;
      }
      const decodedToken = helper.decodeToken(token);
      const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);
      return true;
    }else{
      this.router.navigate(['unauthorized']);
      return false;
    }
    
  }
}
