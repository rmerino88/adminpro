import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, delay, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { UsuariosResponse } from '../interfaces/usuarios-response.interface';
import { Usuario } from '../models/usuario.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private base_url = environment.base_url;

  get token(): string {
    return localStorage.getItem('jwtoken');
  }

  constructor(private http: HttpClient) { }

  public crearUsuario(formData: RegisterForm) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    const options = { headers: httpHeaders };
    // El pipe sigue devolviendo un observable
    // El tap, lo único que realiza es una acción secundaria
    return this.http.post(`${this.base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('jwtoken', resp.token);
      })
    );
  }

  public borrarUsuario(uid: string) {
    // const httpHeaders = new HttpHeaders()
    //   .append('x-token', this.token);
    // const options = { headers: httpHeaders };
    // return this.http.delete(`${this.base_url}/usuarios/${uid}`, { headers: { 'x-token': this.token } )<>.pipe(
    return this.http.delete<{ ok: boolean, uid: string }>
      (`${this.base_url}/usuarios/${uid}`, { headers: { 'x-token': this.token } } ).pipe(
        delay(1000),
        map((ok) => ok)
      );
  }

  public modifyUsuario( formData ) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
    const options = { headers: httpHeaders };
    return this.http.put(`${this.base_url}/usuarios/${formData.uid}`, formData, options).pipe(
      map(  (respuesta: any) => {
        return respuesta.usuarioActualizado;
      }),
      catchError(err => of(false))
    );
  }

  public editarUsuario(uid: string, role: string) {
    // const httpHeaders = new HttpHeaders()
    //   .append('x-token', this.token);
    // const options = { headers: httpHeaders };
    // return this.http.delete(`${this.base_url}/usuarios/${uid}`, { headers: { 'x-token': this.token } )<>.pipe(
    return this.http.put<{ ok: boolean, uid: string }>
      (`${this.base_url}/usuarios/${uid}`, { headers: { 'x-token': this.token } } ).pipe(
        delay(1000),
        map((ok) => ok)
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
  public crearUsuarioOther({ nombre, passwd, email }: RegisterForm) {
    const body = JSON.stringify({ nombre, passwd, email });
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    const options = { headers: httpHeaders };
    return this.http.post(`${this.base_url}/usuarios`, body, options).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  /**
   * @param term string a buscar
   * @param from string con el punto de comienzo
   */
  public buscarUsuariosColeccion(term: string, from: string, limit: string) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
    const httpParams = new HttpParams().append('from', from).append('limit', limit);
    const options = { headers: httpHeaders, params: httpParams };
    return this.http.get<UsuariosResponse>
      (`${this.base_url}/todo/busquedaPorColeccion/usuarios/${term}`, options).pipe(
        // Solo para apreciar el cargando... se puede eliminar
        delay(1000),
        map((resp) => {
          const resultado: Usuario[] = [];
          resp.resultado.forEach(({ role, google, nombre, uid, email, img }) =>
            resultado.push(new Usuario(nombre, email, role, img, google, uid))
          );
          // resp.resultado.forEach( usuarioResp => resultado.push(Usuario.populate(usuarioResp)) );
          return { total: resp.total, resultado };
        })
      );
  }

  /**
   * @param term string a buscar
   * @param from string con el punto de comienzo
   */
  public buscarUsuarios(from: string, limit: string) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
    const httpParams = new HttpParams().append('from', from).append('limit', limit);
    const options = { headers: httpHeaders, params: httpParams };
    // Indicar el UsuariosResponse  significa que la respuesta del servicio cumple essa estructura
    return this.http.get<UsuariosResponse>
      (`${this.base_url}/usuarios`, options).pipe(
        // Solo para apreciar el cargando... se puede eliminar
        delay(1000),
        map((resp) => {
          const resultado: Usuario[] = [];
          resp.resultado.forEach(({ role, google, nombre, uid, email, img }) =>
            resultado.push(new Usuario(nombre, email, role, img, google, uid))
          );
          // resp.resultado.forEach( usuarioResp => resultado.push(Usuario.populate(usuarioResp)) );
          return { total: resp.total, resultado };
        })
      );
  }
}
