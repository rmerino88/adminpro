import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public menuItems: any;

  public usuario: Usuario;
  /**
   * Existen dos maneras de hacer accesible el menu para el componente
   * 1. Hacer els eidebarService publico, y accesible desde el html
   * 2. Asociar el menuItems al menu del loginService
   * 3. Moviendo la llamada de sidebaService.cargarMenu al constructor del PagesComponent
   * Este problema se produce por que el sidebarComponent
   * se carga antes de que el sidebarService haya completado el constructor,
   * aún habiendolo colocado en el pages.component.ts
   */
  // 1. constructor(public sidebarService: SidebarService,
  constructor(private sidebarService: SidebarService,
              private loginService: LoginService) {
    console.log('SidebarComponent constructor');
    this.usuario = this.loginService.usuario;
    // 2. this.menuItems = this.loginService.menu;
    this.menuItems = this.sidebarService.menu; // 3.
  }

  ngOnInit() {
  }

}
