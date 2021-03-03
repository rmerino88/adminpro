import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    // Si no añadimos el formsModule se produce un post normal del formulario
    // Con el FormsModule conseguimos manejar ese envío del form como le indiquemos
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
