import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  public crearUsuario(formData: RegisterForm ) {
    const httpHeaders = new HttpHeaders()
    .append('Content-Type', 'application/json');
    const options = { headers: httpHeaders };
    // El pipe sigue devolviendo un observable
    // El tap, lo único que realiza es una acción secundaria
    return this.http.post(`${this.base_url}/usuarios`, formData).pipe(
      tap( (resp: any ) => {
        localStorage.setItem('jwtoken', resp.token);
        } )
    );
  }

  /**
   * Recibimos el objeto que contiene los datos del formulario
   * y obtenemos los datos que nos interesan.
   *
   * Aunque realmente en el backend da igual lo que lleve el body,
   * solo va a coger los atributos señalados en el schedule.
   *
   *  No es necesario todo esto
   */
  public crearUsuarioOther({nombre , passwd, email}: RegisterForm ) {
    const body = JSON.stringify({nombre , passwd, email});
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    const options = { headers: httpHeaders };
    return this.http.post(`${this.base_url}/usuarios`, body, options).pipe(
      tap( (resp: any ) => {
        localStorage.setItem('token', resp.token);
        } )
    );
  }
}
