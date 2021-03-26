import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  url: string;

  constructor(private http: HttpClient) { }

  showError(err) {
    if (err.error.errors) {
      let mensajeComp = '';
      Object.entries(err.error.errors).map((item: any) => {
        mensajeComp = mensajeComp + item[1].msg;
      });
      Swal.fire(err.error.msg, mensajeComp, 'error');
    } else if (err.error.msg) {
      Swal.fire('Error!', err.error.msg, 'error');
    }
  }
}
