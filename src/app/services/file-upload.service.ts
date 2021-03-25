import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tipo } from '../models/tipos.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private base_url = environment.base_url;

  constructor() { }

  get token(): string {
    return localStorage.getItem('jwtoken');
  }

  async actualizarFoto(archivo: File,
                       tipo: Tipo,
                       id: string) {

    console.log('actualizarFoto', archivo, tipo, id);
    try {
      const url = `${this.base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.token || '',
        },
        body: formData
      });
      // const imageName = await resp.json().then( body => body.name);
      // return imageName;
      const data = await resp.json();
      console.log(data);
      if (data.ok) {
        return data.name;
      }
    } catch (error) {
      return error.error.msg;
    }
  }
}
