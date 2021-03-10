import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // let userlogged = false;
      // this.loginService.validarToken().subscribe(
      //   (resp: boolean) => {
      //     console.log(resp);
      //     userlogged = resp; },
      //   (error) => {
      //     userlogged = false;
      //     // console.log(error);
      //   }
      // );
      // if (userlogged) {
      //   return true;
      // }
      // this.router.navigateByUrl('/login');

      // Si no usamos el router para redirigir bastaría con esto
      // return this.loginService.validarToken();

      return this.loginService.validarToken().pipe(
        tap((isAuthenticated: boolean) => {
          console.log('isAuthenticated', isAuthenticated);
          if (!isAuthenticated) {
            this.router.navigateByUrl('/login');
          }
        })
      );

  }
}
