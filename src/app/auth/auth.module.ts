import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    RouterModule,
    // Si no añadimos el formsModule se produce un post normal del formulario
    // COn el FormsModule conseguimos manejar ese envío del form como le indiquemos
    FormsModule
],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
