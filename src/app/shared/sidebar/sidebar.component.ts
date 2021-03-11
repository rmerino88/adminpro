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
  public imagenUrl: string;
  public username: string;

  public usuario: Usuario;

  constructor(private sidebarService: SidebarService,
              private loginService: LoginService) {
    this.usuario = this.loginService.usuario;
    // this.menuItems = this.sidebarService.menu;
    // this.imagenUrl = this.loginService.usuario.imagenUrl;
    // this.username = this.loginService.usuario.nombre;
  }

  ngOnInit() {
  }

}
