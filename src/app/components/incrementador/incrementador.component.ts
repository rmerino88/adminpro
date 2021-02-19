import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  /**
   * Este valor se puede renombrar si no queremos usar el mismo
   * nombre que utilizamos para llamar al componente
   * <app-incrementador [valor]=20 ></app-incrementador>
   */
  // @Input('valor') progreso: number = 40;
  @Input() progreso = 0;
  @Input() btnClass = 'btn-primary';

  /**
   * Son de tipo eventEmitter, y significa
   * que este componente emite un evento del tipo
   * progresoModificado, y que el padre será el encargado de recoger y tratar.
   */
  @Output() progresoModificado = new EventEmitter<number>();

  /**
   * En el caso de querer devolver objetos complejos podemos
   * podemso indicar que se trata de objetos con diferentes campos
   */
  @Output() progresoModificadoComplex = new EventEmitter<{ posicion: number, progreso: number }>();

  constructor() { }

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    if (this.progreso <= 0 && valor > 0
      || this.progreso >= 100 && valor < 0
      || this.progreso > 0 && this.progreso < 100) {
      this.progreso += valor;
    }

    if (this.progreso < 0) {
      this.progreso = 0;
    }
    if (this.progreso > 100) {
      this.progreso = 100;
    }
    // console.log(this.progreso);
    this.progresoModificado.emit(this.progreso);
  }

  onEnter(nuevoValor) {
    // if (nuevoValor > 100) {
    //   this.progreso = 100;
    // } else if (nuevoValor < 0) {
    //   this.progreso = 0;
    // }
    console.log(nuevoValor);
    this.progreso = nuevoValor;
    this.progresoModificado.emit(this.progreso);
  }

  onPressEnter(event: KeyboardEvent) {
    console.log(event);
    if( event.key === 'Enter' ){
      this.progresoModificado.emit(this.progreso);
    }
  }

}
