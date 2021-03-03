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

// When true, generates a routing module for the initial project.
// ng g m appRouting --flat --routing

import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from '../pages/pages-routing.module';

import { NoPageFoundComponent } from '../pages/nopagefound/nopagefound.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';

const routes: Routes = [
  // path : '/dashboard' PagesRouting
  // path : '/auth' AuthRoutingModule

  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NoPageFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
