import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
      { path: 'account-settings', component: AcountSettingsComponent, data: {title: 'Account Settings'}},
      { path: 'grafica', component: Grafica1Component, data: {title: 'Gráfica'}},
      { path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
      { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'}},
      { path: 'perfil', component: PerfilComponent, data: {title: 'Perfil de usuario'}},
      { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'}},
    ]
  }
  // Ejemplos de paths
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
