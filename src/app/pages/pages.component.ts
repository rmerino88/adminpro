import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
/**
 * Para indicar que es función existe y que no marque error.
 * Si no lo colocamos en los otros componentes de login/register
 * y accedemos a ellos de manera directa sin pasar por el dashboard
 * no se ejecuta y por lo tanto el loading no se oculta nunca.
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
