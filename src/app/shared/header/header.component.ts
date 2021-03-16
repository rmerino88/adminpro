import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario.model';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(private router: Router,
              private ngZone: NgZone,
              private loginService: LoginService) {
    this.startApp();
    this.usuario = this.loginService.usuario;
  }

  public auth2: any;

  ngOnInit() {
  }

  logOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      localStorage.removeItem('jwtoken');
      /**
       * Es necesario ya que sin este run la página no se carga bien,
       * Se produce un error en consola.
       * ngZone.run()
       */
      this.ngZone.run( () => this.router.navigateByUrl('/dashboard') );
    });
  }

  private async startApp() {
    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '1056987659897-h67o3g721r2o8ovul342fmiudpudm8hm.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     // Request scopes in addition to 'profile' and 'email'
    //     // scope: 'additional_scope'
    //   });
    // });
    await this.loginService.googleInit();
    this.auth2 = this.loginService.auth2;
  }


}
