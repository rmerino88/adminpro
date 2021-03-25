import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { ModifyForm } from '../interfaces/modify-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public auth2: any;

  public usuario: Usuario;

  private base_url = environment.base_url;

  constructor(private http: HttpClient) {
    console.log('Inicia loginService');
  }

  set token(jwtoken: string) {
    localStorage.setItem('jwtoken', jwtoken);
  }

  get token(): string {
    return localStorage.getItem('jwtoken');
  }

  set menu(menu: string) {
    localStorage.setItem('menu', menu);
  }

  get menu(): string {
    return JSON.parse(localStorage.getItem('menu'));
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | 'NO_ROLE' {
    return this.usuario.role;
  }

  /**
   * Unicamente devuelve el token correspondiente a los datos enviados
   * Al cargar el dashboard yo buscaría al usuario
   * en caso de no estar en el localStorage y cargaría sus datos.
   */
  public login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData).pipe(
      tap((resp: any) => {
        this.token = resp.token;
        console.log('login', JSON.stringify(resp.menu));
        this.menu = JSON.stringify(resp.menu);
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
        this.token = resp.jsonWebToken;
        console.log('loginGoogle', JSON.stringify(resp.menu));
        this.menu = JSON.stringify(resp.menu);
      })
    );
  }

  public validarTokenOther(): Observable<boolean> {
    return this.http.get(
      `${this.base_url}/login/renew`,
      { headers: { 'x-token': this.token } }
    ).pipe(
      tap((resp: any) => {
        console.log(`tap ${resp}`);
        if (resp) {
          this.token = resp.token;
          this.usuario = resp.usuario;
          console.log('validarTokenOther', JSON.stringify(resp.menu));
          this.menu = JSON.stringify(resp.menu);
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

  /**
   * Se ha eliminado el tap, y se ha sustituido por un map que returno true.
   * En ocasiones podría ocurri que el tap se demore más que el map
   * y las acciones del tap queden inacabadas.
   */
  public validarToken(): Observable<boolean> {
    return this.http.get(
      `${this.base_url}/login/renew`,
      { headers: { 'x-token': this.token } }
    ).pipe(
      map(
        // resp => true no funciona
        (resp: any) => {
          if (resp) {
            this.token = resp.token;
            /**
             * Si realizamos la asignación de manera directa:
             * this.usuario = resp.usuario;
             * No se guarda como una instancia de tipo Usuario, por lo que tampoco
             * disponemos de las características/métodos de esta interface.
             *
             * Es decir,es necesario crear una nueva instancia
             * para disponer de todos los métodos y propiedades.
             *
             * this.usuario.imprimirUsuario();
             * Si llamasemos a un método de la inteface se produciría un error,
             * que en este caso es recogido por el catchError.
             */
            const { nombre, email, role, img, google, uid, passwd } = resp.usuario;
            this.usuario = new Usuario(
              nombre,
              email,
              role,
              img,
              google,
              uid);
            // console.log(typeof this.usuario); --> Sigue diciendo que es Object, no ofrece más información
            console.log('validarToken', JSON.stringify(resp.menu));
            this.menu =  JSON.stringify(resp.menu);

            return true;
          }
        }),
      catchError(err => of(false))
    );
  }

  public modifyUsuario(formData: ModifyForm) {
    formData.role = this.usuario.role;
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);

    const options = { headers: httpHeaders };
    /**
     * No es necesario actualizar el atributo usuario en el servicio,
     * podemos actualizar unicamente los campos deseados en el componente.
     *
     * Por que el componente hace referencia al atributo usuario del servicio.
     *
     * El servicio es singleton y si se cambia cualquuiera de sus atributos,
     * cambiará para todos los elementos que hagan uso de él.
     *
     * No es lo mismo asignar otro objeto al atributo usuatrio que modificar sus atributos,
     * ya que si realizamos la asignación de un nuevo objeto, se romperá la referencia.
     * Los componentes seguirán apuntando al objeto antiguo.
     */
    // return this.http.put(`${this.base_url}/usuarios/${this.usuario.uid}`, formData, options).pipe(
    //   map((resp: any) => {
    //     const { nombre, email, role, img, google, uid } = resp.usuarioActualizado;
    //     // this.usuario = new Usuario(nombre, email, role, img, google, uid);
    //     this.usuario.nombre = nombre;
    //     this.usuario.email = email;
    //   })
    // );
    console.log(formData);
    return this.http.put(`${this.base_url}/usuarios/${this.usuario.uid}`, formData, options);
  }

  googleInit() {
    return new Promise<void>(resolve => {
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
