import { NgModule } from '@angular/core';
// ng g m pages/pages --flat
/**
 * Realmente nosotros no necesitamos tener la configuración
 * de enroutado de la applicación, por lo que no es necesario
 * importar nuestro módulo.
 * Únicamente la librería de RouterModule
 */
// import { AppRoutingModule } from '../app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { NoPageFoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

/**
 * No es necesario importar este módulo en el app.module.ts
 * por que no se hace uso directo de ninguno de sus componentes
 * desde otros components que no sean los de pages.
 */
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
    imports: [
        /**
         * Al encapsular código perdemos el acceso al app-routing.module.ts
         * que se encunetra importado en el app.module.ts
         * Por eso, lo tenemos que importar para que lso componentes que forman parte del paquete
         * puedan hacer uso de el.
         */
        // AppRoutingModule,
        RouterModule,
        SharedModule,
        ComponentsModule,
        FormsModule
    ],
    declarations: [
        /**
         * The set of selectors that are available to
         * a template include those declared here, and
         * those that are exported from imported NgModules.
         */
        ProgressComponent,
        Grafica1Component,
        NoPageFoundComponent,
        DashboardComponent,
        PagesComponent
    ],
    exports: [
        ProgressComponent,
        Grafica1Component,
        NoPageFoundComponent,
        DashboardComponent,
        PagesComponent
    ]
})
export class PagesModule { }
