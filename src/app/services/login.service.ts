import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/register-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public auth2: any;

  private base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  /**
   * Unicamente devulve el token correspondiente a los datos enviados
   * Al cargar eld ashboard yo buscaría al usuario en caso de no estar en el localStorage
   * y cargaría sus datos
   */
  public login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData).pipe(
      tap((resp: any) => {
        console.log(resp.token);
        localStorage.setItem('jwtoken', resp.token);
      })
    );
  }

  public loginGoogle(token: string) {
    const body = JSON.stringify({ token });
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    const options = { headers: httpHeaders };
    return this.http.post(`${this.base_url}/login/google`, body, options).pipe(
      tap((resp: any) => {
        localStorage.setItem('jwtoken', resp.jsonWebToken);
      })
    );
  }

  public validarTokenOther(): Observable<boolean> {
    const jwtoken = localStorage.getItem('jwtoken');

    // if (!jwtoken) {
    //   return new Observable<boolean>(observer => { observer.next(false); });
    // }

    return this.http.get(
      `${this.base_url}/login/renew`,
      { headers: { 'x-token': jwtoken } }
    ).pipe(
      tap((resp: any) => {
        console.log(`tap ${resp}`);
        if (resp) {
          localStorage.setItem('jwtoken', resp.token);
        }
      }),
      map((resp: any) => {
        console.log(`map ${resp}`);
        // if (resp.ok && resp.token) {
        if (resp) {
          console.log('return true');
          return true;
        }
        console.log('return false');
        return false;
      }),
      catchError(
        err => {
          console.log('catchError');
          console.log('Handling error locally and rethrowing it...', err);
          // return throwError(err);
          // return new Observable<boolean>(observer => { observer.next(); });
          return of(false);
        }),
    );
  }

  public validarToken(): Observable<boolean> {
    const jwtoken = localStorage.getItem('jwtoken');

    return this.http.get(
      `${this.base_url}/login/renew`,
      { headers: { 'x-token': jwtoken } }
    ).pipe(
      tap(
        // resp => true no funciona
        (resp: any) => {
          if (resp) {
            localStorage.setItem('jwtoken', resp.token);
          }
        }),
      map(resp => resp ? true : false),
      catchError(err => of(false))
    );
  }

  googleInit() {

    return new Promise<void>( resolve => {
      console.log('entra googleInit');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1056987659897-h67o3g721r2o8ovul342fmiudpudm8hm.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

}
