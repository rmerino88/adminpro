import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { UsuariosResponse } from '../interfaces/usuarios-response.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  private base_url = environment.base_url;

  get token(): string {
    return localStorage.getItem('jwtoken');
  }

  constructor(private http: HttpClient) { }

  /**
   * @param tipo coleccion en la que buscar
   * @param term string a buscar
   * @param from string con el punto de comienzo
   */
  public buscarUsuariosColeccion(term: string, tipo: 'usuarios' | 'medicos' | 'hospitales', from: string, limit: string) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
    const httpParams = new HttpParams().append('from', from).append('limit', limit);
    const options = { headers: httpHeaders, params: httpParams };
    return this.http.get(`${this.base_url}/todo/busquedaPorColeccion/${tipo}/${term}`, options).pipe(
      map((resp: { msg: string, resultado: any, total: number }) => resp)
    );
  }
}
