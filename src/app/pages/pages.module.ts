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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


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
import { PipesModule } from '../pipes/pipes.module';

import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';

import { MedicoComponent } from './mantenimientos/medicos/medico.component';


@NgModule({
    imports: [
        /**
         * Al encapsular código perdemos el acceso al app-routing.module.ts
         * que se encunetra importado en el app.module.ts
         * Por eso, lo tenemos que importar para que lso componentes que forman parte del paquete
         * puedan hacer uso de el.
         */
        // AppRoutingModule,
        BrowserModule,
        RouterModule,
        SharedModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PipesModule
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
        PagesComponent,
        AcountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
        UsuariosComponent,
        // Los pipes ya no se importan, solo se declaran
        // ImagenUrlPipe,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent
    ],
    exports: [
        ProgressComponent,
        Grafica1Component,
        NoPageFoundComponent,
        DashboardComponent,
        PagesComponent,
        AcountSettingsComponent,
        PerfilComponent
    ],
    providers: []
})
export class PagesModule { }
