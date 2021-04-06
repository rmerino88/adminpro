import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tipo } from '../models/tipos.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private base_url = environment.base_url;
  private cloudinaryUrl = environment.cloudinary_upload_url;
  private uploadPreset = 'vmavx5oa';

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('jwtoken');
  }

  async uploadFile(file: File, tipo: Tipo, id: string) {

    try {

      const formdata = new FormData();
      formdata.append('upload_preset', this.uploadPreset);
      formdata.append('file', file);
      formdata.append('folder', `hospital_app/${tipo}`);

      const requestOptions = {
        method: 'POST',
        body: formdata
      };
      // redirect: 'follow'

      const resp = await fetch(this.cloudinaryUrl, requestOptions);
      if (!resp.ok) {
        throw new Error(('No se pudo realizar la petición'));
      }
      const response = await resp.json();
      const { secure_url } = response;
      return secure_url;
    } catch (err) {
      console.warn(err);
    }
  }

  /**
   * El método put al considerarse una modificación necesita de body, siempre aunque sea un null.
   * Si no el método entiende que son los headers los que se mandan en el body.
   */
  modifyItem(urlImgCloudinary: string, tipo: Tipo, id: string) {
    return this.http.put(`${this.base_url}/image/${tipo}/${id}`,
      { urlImg: urlImgCloudinary },
      { headers: { 'x-token': this.token } }).pipe(
        map((respuesta: any) => {
          return respuesta.name;
        }),
        catchError((err) => of(err.error.msg))
      );
  }

  /**
   * Todo el proceso se realiza de manera asyncrona se retorna una promesa
   */
  async uploadFileOk(file: File, tipo: Tipo, id: string) {

    try {

      const formdata = new FormData();
      formdata.append('upload_preset', this.uploadPreset);
      formdata.append('file', file);

      const requestOptions = {
        method: 'POST',
        body: formdata
      };
      // redirect: 'follow'
      const resp = await fetch(this.cloudinaryUrl, requestOptions);

      if (!resp.ok) {
        throw new Error(('No se pudo realizar la petición'));
      }
      const { public_id } = await resp.json();

      try {
        const url = `${this.base_url}/image/${tipo}/${id}/${public_id}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'x-token': this.token || '',
          }
        });

        const data = await response.json();
        console.log(data);
        if (data.ok) {
          console.log('Llamada servicio update img', data.name);
          return data.name;
        }
      } catch (error) {
        console.log('Llamada servicio update img', error);
        return error.error.msg;
      }
    } catch (err) {
      console.warn(err);
    }
  }

}
