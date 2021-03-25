import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private base_url = environment.base_url;

  get token(): string {
    return localStorage.getItem('jwtoken');
  }

  get headers(): HttpHeaders {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', this.token);
  }
  /**
   * Las rutas se pueden colocar como rutas o como cada uno de los hijos
   * definidos en el router.
   * Si ponemos las rutas el routerLinkActive funciona correctamente.
   * En caso contrario, o el main no se marca o se marca siempre.
   */
  // menuPaths: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       {
  //         title: 'Main',
  //         url: '/dashboard',
  //       },
  //       {
  //         title: 'ProgressBar',
  //         url: '/dashboard/progress',
  //       },
  //       {
  //         title: 'Grafica',
  //         url: '/dashboard/grafica',
  //       },
  //       {
  //         title: 'Promesas',
  //         url: '/dashboard/promesas',
  //       },
  //       {
  //         title: 'Rxjs',
  //         url: '/dashboard/rxjs',
  //       },
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {
  //         title: 'Usuarios',
  //         url: 'usuarios',
  //       },
  //       {
  //         title: 'Hospitales',
  //         url: 'hospitales',
  //       },
  //       {
  //         title: 'Médicos',
  //         url: 'medicos',
  //       }
  //     ]
  //   }
  // ];

  // menuOriginal: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       {
  //         title: 'Main',
  //         url: '',
  //       },
  //       {
  //         title: 'ProgressBar',
  //         url: 'progress',
  //       },
  //       {
  //         title: 'Grafica',
  //         url: 'grafica',
  //       },
  //       {
  //         title: 'Promesas',
  //         url: '/dashboard/promesas',
  //       },
  //       {
  //         title: 'Rxjs',
  //         url: '/dashboard/rxjs',
  //       },
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {
  //         title: 'Usuarios',
  //         url: 'usuarios',
  //       },
  //       {
  //         title: 'Hospitales',
  //         url: 'hospitales',
  //       },
  //       {
  //         title: 'Médicos',
  //         url: 'medicos',
  //       }
  //     ]
  //   }
  // ];

  menu: any[];

  constructor(private http: HttpClient,
              private router: Router) {
    console.log('Inicia sidebarService');
  }

  public cargarMenu() {
    console.log('SidebarService cargarMenu');
    this.menu = JSON.parse( localStorage.getItem('menu') );
    if (this.menu.length === 0) {
      this.router.navigateByUrl('/login');
    }
  }
}
