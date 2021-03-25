import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { Tipo } from '../models/tipos.model';
import { BusquedaCompletaResponse } from '../interfaces/busqueda-response.interface';

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
  public buscarColeccion(term: string, tipo: Tipo, from?: string, limit?: string) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
    // const httpParams = new HttpParams().append('from', from).append('limit', limit);
    const httpParams = new HttpParams();
    if (from) {
      httpParams.append('from', from);
    }
    if (limit) {
      httpParams.append('limit', limit);
    }
    const options = { headers: httpHeaders, params: httpParams };
    return this.http.get(`${this.base_url}/todo/busquedaPorColeccion/${tipo}/${term}`, options).pipe(
      map((resp: { msg: string, resultado: any, total: number }) => resp)
    );
  }

  /**
   * @param term string a buscar
   * @param from string con el punto de comienzo
   * @param limit string con el número de elementos a mostrar
   * 
   */
  public buscarTodo(term: string, from?: string, limit?: string) {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
    // const httpParams = new HttpParams().append('from', from).append('limit', limit);
    const httpParams = new HttpParams();
    if (from) {
      httpParams.append('from', from);
    }
    if (limit) {
      httpParams.append('limit', limit);
    }
    const options = { headers: httpHeaders, params: httpParams };
    /**
     * Aunque podemos indicarle el tipo de los resultados
     * no quiere decir que tenga que corresponder al 100%.
     * Los objetos de las listas no cumplen los campos definifos, genera listas de Objects.
     */
    return this.http.get<BusquedaCompletaResponse>(`${this.base_url}/todo/${term}`, options).pipe(
      map(({ ok, msg, usuarios, medicos, hospitales }) => {
        // console.log(ok, msg, usuarios, medicos, hospitales);
        return {usuarios, hospitales, medicos};
      })
    );
  }
}
