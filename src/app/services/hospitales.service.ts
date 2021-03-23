import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Hospital } from '../models/hospital.model';
import { HospitalesResponse } from '../interfaces/hospitales-response.interface';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  private base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('jwtoken');
  }

  get headers(): HttpHeaders {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
  }

  obtenerHospitales() {
    // const httpParams = new HttpParams().append('from', from).append('limit', limit);
    // const options = { headers: httpHeaders, params: httpParams };
    const options = { headers: this.headers };
    return this.http.get<HospitalesResponse>
      (`${this.base_url}/hospitales`, options).pipe(
        map((resp) => {
          return resp.hospitales;
        })
      );
  }

  addHospital(nombre: string) {
    const options = { headers: this.headers };
    return this.http.post
      (`${this.base_url}/hospitales`, { nombre }, options).pipe(
        map( (resp: { ok: boolean, hospital: Hospital } ) => {
          return resp.hospital;
        })
      );
  }

  editHospital( _id: string, nombre: string) {
    const options = { headers: this.headers };
    return this.http.put
      (`${this.base_url}/hospitales/${_id}`, { nombre }, options).pipe(
        map( (resp: { ok: boolean, hospital: Hospital } ) => {
          return resp.hospital;
        })
      );
  }

  deleteHospital( _id: string) {
    const options = { headers: this.headers };
    return this.http.delete
      (`${this.base_url}/hospitales/${_id}`,options).pipe(
        map( (resp: { ok: boolean, uid: string } ) => {
          return resp.uid;
        })
      );
  }

}
