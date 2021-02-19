import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {
  /**
   * Parq eue el elemento se actualice en el momento que pulsamos
   * es necesario que el elemento que enlace con el data esté enlazado
   * con el padre
   */
  @Input() doughnutChartDataOther: MultiDataSet = [];
  @Input() title: string;
  @Input() doughnutChartLabelsOther: Label[] = [];

  @Input() dataset: number[];
  @Output() changeGraphic = new EventEmitter<number>();

  // Colores
  public colors: Color[] = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
  ];

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    // this.doughnutChartData.push(this.dataset);
    this.doughnutChartData = [ this.dataset ];
    console.log(this.doughnutChartLabelsOther);
    console.log(this.title);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // event emitter to parent, to change data
  public changeChart() {
    this.changeGraphic.emit(3);
  }

}
