import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalMedicoService {

  private _ocultarModal = true;

  // Se trata de un observable al que me puedo suscribir desde donde quiera
  public medicoAniadido: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

}
