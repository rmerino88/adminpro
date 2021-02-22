import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
/**
 * Para indicar que es función existe y que no marque error
 */
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {


  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.establishTheme();
    customInitFunctions();
  }

}
