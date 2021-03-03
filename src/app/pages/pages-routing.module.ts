import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { NoPageFoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
      { path: 'grafica', component: Grafica1Component, data: {title: 'Gráfica'}},
      { path: 'account-settings', component: AcountSettingsComponent, data: {title: 'Account Settings'}},
      { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'}},
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
