import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tipo } from 'src/app/models/tipos.model';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { LoginService } from '../../../services/login.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  // term = '';
  public from = 0;
  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];

  public cargando = false;
  public showBtnSiguientes = false;

  public numerosResultados: number[] = [5, 10, 15];
  public limit = 5;

  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private loginService: LoginService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.buscar();
    this.imgSubs = this.modalImagenService.imgCambiada.subscribe((img) => {
      // if (termino) {
      //   this.buscarTermino(termino);
      // } else {
      this.buscar();
      // }
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscar() {
    this.cargando = true;
    this.usuarioService.buscarUsuarios('' + this.from, '' + this.limit).subscribe(({ total, resultado }) => {
      this.usuarios = resultado;
      this.totalUsuarios = total;
      this.cargando = false;
      this.setBotonSiguiente();
    });
  }

  buscarTermino(termino: string) {
    this.cargando = true;
    this.busquedasService.buscarUsuariosColeccion(termino, 'usuarios', '' + this.from, '' + this.limit)
      .subscribe(({ total, resultado }) => {
        this.usuarios = resultado;
        this.totalUsuarios = total;
        this.cargando = false;
        this.setBotonSiguiente();
      });
  }

  async eliminarUsuario(usuario: Usuario, termino: string) {
    if (usuario.uid === this.loginService.usuario.uid) {
      Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    } else {
      Swal.fire({
        title: `¿Estás seguro de borrar a ${usuario.nombre}?`,
        text: '¡Esta acción no puede ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar usuario!',
        cancelButtonText: 'No!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.borrarUsuario(usuario.uid).subscribe(deleteOk => {
            if (deleteOk) {
              Swal.fire(
                'Eliminado!',
                `El usuario ${usuario.nombre} ha sido eliminado.`,
                'success'
              );
              if (termino) {
                this.buscarTermino(termino);
              } else {
                this.buscar();
              }
            }
          });
        }
      });
    }
  }

  cambiarRole(usuario) {
    this.usuarioService.modifyUsuario(
      {
        uid: usuario.uid,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role
      }
    ).subscribe(respUsuario => {
      // Mensaje solo en caso error
      if (!respUsuario) {
        Swal.fire('Error', 'No se ha podido modificar el usuario.', 'error');
      }
    });
  }

  abrirModalImagen(usuario: Usuario) {
    this.modalImagenService.abrirModal(Tipo.usuarios, usuario.uid, usuario.img);
    // this.modalImagenService.abrirModalAlt(usuario);
  }

  buscarTerminoKeyUp(termino: string) {
    this.from = 0;
    if (termino) {
      this.buscarTermino(termino);
    } else {
      this.buscar();
    }
  }

  actualizarTabla(moveIndex: number, termino: string) {
    this.from += (moveIndex * this.limit);
    if (termino) {
      this.buscarTermino(termino);
    } else {
      this.buscar();
    }
  }

  changeNumeroresultados(value: number, termino: string) {
    this.limit = value;
    this.from = 0;
    if (termino) {
      this.buscarTermino(termino);
    } else {
      this.buscar();
    }
  }

  private setBotonSiguiente() {
    if (this.usuarios.length < this.limit || this.totalUsuarios === (this.from + this.limit)) {
      this.showBtnSiguientes = true;
    } else {
      this.showBtnSiguientes = false;
    }
  }
}
