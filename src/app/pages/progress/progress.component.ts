import { Component, OnInit } from '@angular/core';
// ng g c pages/progress -s --skipTests=true --force

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progresos: number[] = [ 50, 25 ];

  progreso1 = 60;
  progreso2 = 30;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Los métodos getter se pueden ussar como si fuesen una propiedad más.
   * Al comportarse de esta manera al haber un cambio en la propiedad
   * progreso el return que devuelve el método es distinto, y se actualiza inmediatamente.
   */
  get getProgreso1() {
    return `${this.progreso1}%`;
  }
  get getProgreso2() {
    return `${this.progreso2}%`;
  }

  setProgreso1(progreso: number) {
    console.log('1', { progreso });
    this.progreso1 = progreso;
  }

  setProgreso2(progreso: number) {
    console.log('2', { progreso });
    this.progreso2 = progreso;
  }

  // Con array de progresos
  /**
   * A get acceso cannot have parameters
   */
  getProgreso(index: number) {
    return `${this.progresos[index]}%`;
  }
  setProgreso(index: number, value: number) {
    console.log(`setProgreso(${index},${value})`);
    this.progresos[index] = value;
  }


}
