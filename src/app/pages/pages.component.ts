import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  private linkTheme: Element  = document.querySelector('#theme');

  constructor() { }

  ngOnInit() {
    const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'purple-dark';
    this.linkTheme.setAttribute('href', `./assets/css/colors/${theme}.css`);
  }

}
