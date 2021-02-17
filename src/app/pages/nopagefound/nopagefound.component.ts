import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NoPageFoundComponent implements OnInit {

  year = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
