import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
/**
 * Para indicar que esa función existe y que no marque error.
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

  /**
   * Caragamos aquí el sidebarService para poder hacer una llamada
   */
  constructor(private settingsService: SettingsService,
              private sidebarService: SidebarService) { 
    // console.log('PagesComponent constructor');
    this.sidebarService.cargarMenu();
  }
  ngOnInit() {
    this.settingsService.establishTheme();
    customInitFunctions();
    // console.log('PagesComponent ngOnInit');
    // this.sidebarService.cargarMenu();
  }

}
