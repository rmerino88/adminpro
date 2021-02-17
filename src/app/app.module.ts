import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Modulos
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
// Routing
import { AppRoutingModule } from './routing/app-routing.module';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    /**
     * The base href is the URL prefix that should be preserved
     * when generating and recognizing URLs.
     *
     * Dependiendo de lo que pongamos como APP_BASE_HREF
     * genera una estructura de carpetas distinta para las rutas relativas,
     * añadiendo niveles se pueden perder las referencias a los assets
     * cuyas rutas están a mano en el html.
     *
     * Al generar las urls relativas que se encuentran dentro de los htmls de
     * la aplicación toma como carpeta base lo que se le indique aquí.
     *
     * Si colocamos / funciona pero no cuando hay urls con hijos children,
     * porque monta la url de los recursos con la página padre como base.
     */
    {provide: APP_BASE_HREF, useValue: ''}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
