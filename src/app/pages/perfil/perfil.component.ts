import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from '../../models/usuario.model';
import { LoginService } from '../../services/login.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
    `img {
      width: 80%;
      display: block;
      margin: 0px auto;
      margin-bottom: 15px;
      /* No funcionan las animaciones */
      -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
      -moz-animation: fadein 2s; /* Firefox < 16 */
      -ms-animation: fadein 2s; /* Internet Explorer */
      -o-animation: fadein 2s; /* Opera < 12.1 */
      animation: fadein 2s;
    }`
  ]
})
export class PerfilComponent implements OnInit {

  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public usuario: Usuario;

  public modifyform: FormGroup;

  public image: File;
  public imageTempUrl: string | ArrayBuffer;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private fileUploadService: FileUploadService) {
    this.usuario = this.loginService.usuario;
  }
  /**
   * Nos hemos llevadola incializacion del formGroup al onInit
   * para poder darle los valores del this.usuario
   */
  ngOnInit(): void {
    this.modifyform = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(6)]],
      email: [this.usuario.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      // No podemos deshabilitar el campo ya que el backend los espera al ser llamado en el modifyUsuario
      // email: [{ value: this.usuario.email, disabled: this.usuario.google },
      // [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  actualizarPerfil() {
    // Meter en objeto usuario los campos modificados
    this.loginService.modifyUsuarioOther(this.modifyform.value).subscribe(
      (response: any) => {
        this.usuario.nombre = response.usuarioActualizado.nombre;
        this.usuario.email = response.usuarioActualizado.email;
        Swal.fire({
          title: 'Proceso finalizado!',
          text: 'La información del usuario ha sido actualizada con éxito',
          icon: 'info',
          confirmButtonText: 'Entendido!'
        });
      },
      err => {
        console.warn('Usuario add err:', err.error.msg);
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Entendido!'
        });
      },
      () => console.log(`Complete!`)
    );
  }

  cambiarImagen(file: File, result) {
    // Asignar imagen asociada al attr image
    this.image = file;

    if (!file) {
      this.imageTempUrl = null;
      return;
    }
    // Mostrar imagen
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      this.imageTempUrl = reader.result;
    };
  }

  actualizarImagen() {
    this.fileUploadService.actualizarFoto(this.image, 'usuarios', this.usuario.uid)
      .then((img) => {
        if (!img) {
          Swal.fire('Error!', 'No ha sido posible guardar la imagen', 'error');
        } else {
          console.log(img);
          this.usuario.img = img;
          Swal.fire({
            title: 'Proceso finalizado!',
            text: 'La imagen del usuario ha sido actualizada con éxito',
            icon: 'info',
            confirmButtonText: 'Entendido!'
          });
          this.image = null;
        }
      }).catch((errMsg) => {
        Swal.fire('Error!', errMsg, 'error');
      });
  }
}
