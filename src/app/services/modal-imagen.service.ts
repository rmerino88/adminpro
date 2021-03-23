import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Tipo } from '../models/tipos.model';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal = true;

  private baseImageUrl = `${environment.base_url}/upload/`;

  // public usuario: Usuario = new Usuario('', '', '');

  public tipo: Tipo;
  public uid: string;
  public img: string;

  // Se trata de un observable al que me puedo suscribir desde donde quiera
  public imgCambiada: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: Tipo,
    uid: string,
    img: string = 'no-image') {
    this.tipo = tipo;
    this.uid = uid;
    this.img = img;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${this.baseImageUrl}/${this.tipo}/${img}`;
    }
    this._ocultarModal = false;
  }
  /**
   * Este método no sirve par nada
   * ya que este modal se usa para todos los elementos cosn imagenes
   * @param usuario objeto de tipo Usuario
   */
  abrirModalAlt(usuario: Usuario) {
    /**
     * Muy importante!! no cambiar la referencia de un obejto
     * de un servicio al que apuntan otros componentes.
     * Por que al reasignarlo a otro elemento, el objeto del servicio se actualiza,
     * pero no el de los componentes.
     */
    // this.usuario = usuario;
    // this.usuario = Usuario.populate(usuario);

    // this.usuario.nombre = usuario.nombre;
    // this.usuario.email = usuario.email;
    // this.usuario.uid = usuario.uid;
    // this.usuario.img = usuario.img;
    // this.usuario.role = usuario.role;
    // this.usuario.google = usuario.google;
    // this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}
