import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: []
})
export class Grafica1Component implements OnInit {

  public doughnutChartData1: MultiDataSet = [];
  public doughnutChartData2: MultiDataSet = [];
  public doughnutChartLabels1: Label[] = ['Download Sales X', 'In-Store Sales Y', 'Mail-Order Sales Z'];

  constructor() { }

  ngOnInit(): void {
    this.changeDoughnutChartData1();
    this.changeDoughnutChartData2();
  }

  changeDoughnutChartData1(numberOfElements: number = 3) {
    const dataset = [];
    for (let index = 0; index < numberOfElements; index++) {
      dataset.push(this.getRandomNumber());
    }
    this.doughnutChartData1 = [];
    this.doughnutChartData1.push(dataset);
  }

  changeDoughnutChartData2(numberOfElements: number = 3) {
    const dataset = [];
    for (let index = 0; index < numberOfElements; index++) {
      dataset.push(this.getRandomNumber());
    }
    this.doughnutChartData2 = [];
    this.doughnutChartData2.push(dataset);
  }

  private getRandomNumber( min: number = 200, max: number= 1000 ) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
