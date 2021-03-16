import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  /**
   * Las rutas se pueden colocar como rutas o como cada uno de los hijos
   * definidos en el router.
   * Si ponemos las rutas el routerLinkActive funciona correctamente.
   * En caso contrario, o el main no se marca o se marca siempre.
   */
  menuPaths: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/dashboard',
        },
        {
          title: 'ProgressBar',
          url: '/dashboard/progress',
        },
        {
          title: 'Grafica',
          url: '/dashboard/grafica',
        },
        {
          title: 'Promesas',
          url: '/dashboard/promesas',
        },
        {
          title: 'Rxjs',
          url: '/dashboard/rxjs',
        },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuarios',
          url: 'usuarios',
        },
        {
          title: 'Hospitales',
          url: 'hospitales',
        },
        {
          title: 'Médicos',
          url: 'medicos',
        }
      ]
    }
  ];

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '',
        },
        {
          title: 'ProgressBar',
          url: 'progress',
        },
        {
          title: 'Grafica',
          url: 'grafica',
        },
        {
          title: 'Promesas',
          url: '/dashboard/promesas',
        },
        {
          title: 'Rxjs',
          url: '/dashboard/rxjs',
        },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuarios',
          url: 'usuarios',
        },
        {
          title: 'Hospitales',
          url: 'hospitales',
        },
        {
          title: 'Médicos',
          url: 'medicos',
        }
      ]
    }

  ];

  constructor() { }
}
