import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private loginService: LoginService) { }

  canLoad(route: Route,
          segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.loginService.validarToken().pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

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
          if (!isAuthenticated) {
            this.router.navigateByUrl('/login');
          }
        })
      );

  }
}
