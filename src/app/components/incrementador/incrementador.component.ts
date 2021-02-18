import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  /**
   * Son de tipo eventEmitter
   */
  @Output() newItemEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
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

    this.newItemEvent.emit(this.progreso);
  }
}

