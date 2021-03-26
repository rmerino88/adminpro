import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guards
import { AuthGuard } from '../guards/auth.guard';

// Components
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    // Al hacer uso del Lazy load tenemos que hacer uso del can load,
    // ya que además de activación ahora se cargan
    canLoad: [ AuthGuard ],
    // LazyLoad: Carag de módulos bajo demanda
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
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
