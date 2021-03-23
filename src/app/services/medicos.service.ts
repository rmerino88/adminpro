import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs/operators';
import { MedicosResponse, MedicoResponse } from '../interfaces/medicos-response.interface';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

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

  getMedicoById(mid: string) {
    const options = { headers: this.headers };
    return this.http.get<MedicoResponse>
      (`${this.base_url}/medicos/${mid}`, options).pipe(
        map( (resp) => {
          return new Medico(
            resp.medico.nombre,
            resp.medico.hospital,
            resp.medico.img,
            resp.medico.mid);
        })
      );
  }

  obtenerMedicos() {
    // const httpParams = new HttpParams().append('from', from).append('limit', limit);
    // const options = { headers: httpHeaders, params: httpParams };
    const options = { headers: this.headers };
    // return this.http.get<MedicosResponse>
    //   (`${this.base_url}/medicos`, options).pipe(
    //     map((resp) => {
    //       return resp.medicos;
    //     })
    //   );

    return this.http.get<MedicosResponse>
      (`${this.base_url}/medicos`, options).pipe(
        map((resp) => {
          const medicos: Medico[] = [];
          resp.medicos.forEach(({ nombre, hospital, img, mid }) =>
            medicos.push(new Medico(nombre, hospital, img, mid))
          );
          return medicos;
        })
      );
  }

  addMedico(nombre: string, hospital: string) {
    const options = { headers: this.headers };
    return this.http.post
      (`${this.base_url}/medicos`, { nombre, hospital }, options).pipe(
        map((resp: { ok: boolean, medico: Medico }) => {
          return resp.medico;
        })
      );
  }

  editMedico(mid: string, nombre: string, hospitalId: string) {
    const options = { headers: this.headers };
    return this.http.put
      (`${this.base_url}/medicos/${mid}`, { nombre, hospital: hospitalId }, options).pipe(
        map((resp: { ok: boolean, medicoActualizado: Medico }) => {
          return resp.medicoActualizado;
        })
      );
  }

  deleteMedico(mid: string) {
    const options = { headers: this.headers };
    return this.http.delete
      (`${this.base_url}/medicos/${mid}`, options).pipe(
        map((resp: { ok: boolean, uid: string }) => {
          console.log(resp);
          return resp.uid;
        })
      );
  }
}
