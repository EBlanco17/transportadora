import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../_service/login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private loginService: LoginService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.loginService.estaLogeado()) {

      const helper = new JwtHelperService();
      let token: any = sessionStorage.getItem(environment.TOKEN);

      if (!helper.isTokenExpired(token)) {
        const decodedToken = helper.decodeToken(token);
        const rol: string = decodedToken.authorities[0];
        const url: string = state.url;

        if (rol == "Administrador" && (url.includes('perfil') || url.includes('conductor') || url.includes('camion') || url.includes('departamento'))) {
          return true;
        } else if (rol == "Conductor" && (url.includes('perfil') || url.includes('usuario') || url.includes('editar') || url.includes('pedido'))) {
          return true;
        } else {
          this.loginService.closeSession();
          return false;
        }
      } else {
        this.loginService.closeSession();
        return false;
      }

    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }

  }
}
