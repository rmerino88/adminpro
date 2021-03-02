import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Formularios reactivos
  public registerForm = this.fb.group({
    nombre: ['Fernando', [Validators.required, Validators.minLength(3)]],
    email: ['test@testmail.com', [Validators.required, Validators.email]],
    passwd: ['123456', [Validators.required, Validators.minLength(6)]],
    passwd2: ['123456', [Validators.required, Validators.minLength(6)]],
    terminos: [false, Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  crearUsuario() {
    console.log(this.registerForm.value);
  }
}
