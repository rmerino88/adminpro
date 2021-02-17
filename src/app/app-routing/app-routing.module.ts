import { NgModule } from '@angular/core';
/**
 * Como el módulo está únicamente enfocado en las rutas
 * no necesitamos de las funcionalidades de CommonModule.
 *
 * Exports all the basic Angular directives and pipes,
 * such as NgIf, NgForOf, DecimalPipe, and so on.
 * Re-exported by BrowserModule, which is included automatically
 * in the root AppModule when you create a new app with the CLI new command.
 */
// import { CommonModule } from '@angular/common';

// Formas de crear el module routing //
// ng g m appRouting
// ng g m appRouting --flat
// --routing
// When true, generates a routing module for the initial project.
// ng new routing-app --routing

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Grafica1Component } from '../pages/grafica1/grafica1.component';
import { NoPageFoundComponent } from '../pages/nopagefound/nopagefound.component';
import { PagesComponent } from '../pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'grafica', component: Grafica1Component},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: NoPageFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
