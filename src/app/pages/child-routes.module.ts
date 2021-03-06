import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Guards
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
  { path: 'account-settings', component: AcountSettingsComponent, data: {title: 'Account Settings'}},
  { path: 'grafica', component: Grafica1Component, data: {title: 'Gráfica'}},
  { path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
  { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'}},
  { path: 'perfil', component: PerfilComponent, data: {title: 'Perfil de usuario'}},
  { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'}},
  // Mantenimientos
  { path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ], data: {title: 'Usuarios de aplicación'}},
  { path: 'hospitales', component: HospitalesComponent, data: {title: 'Hopsitales del sistema'}},
  { path: 'medico/:id', component: MedicoComponent, data: {title: 'Modificar médico'}},
  { path: 'medicos', component: MedicosComponent, data: {title: 'Médicos registrados'}},
  { path: 'busqueda/:term', component: BusquedaComponent, data: {title: 'Búsqueda'}},
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
