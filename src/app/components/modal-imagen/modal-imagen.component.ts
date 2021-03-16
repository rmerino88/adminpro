import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imageToUpload: File;
  public imageTempUrl: string | ArrayBuffer;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService) {
  }

  ngOnInit(): void { }

  cerrarModal() {
    this.imageToUpload = null;
    this.imageTempUrl = null;
    this.modalImagenService.cerrarModal();
  }

  actualizarImagen() {

    const uid = this.modalImagenService.uid;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService.actualizarFoto(this.imageToUpload, tipo, uid)
      .then((img) => {
        if (!img) {
          Swal.fire('Error!', 'No ha sido posible guardar la imagen', 'error');
        } else {
          // Emitir evento para que captarlo desde la tabla y actualizar la imagen
          Swal.fire({
            title: 'Proceso finalizado!',
            text: 'La imagen del usuario ha sido actualizada con éxito',
            icon: 'info',
            confirmButtonText: 'Entendido!'
          });
          this.modalImagenService.imgCambiada.emit(img);
        }
      }).catch( (errMsg) => {
        Swal.fire('Error!', errMsg, 'error');
      }).finally(() => this.cerrarModal());
  }

  cambiarImagen(file: File, result) {
    // Asignar imagen asociada al attr image
    this.imageToUpload = file;

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

}
