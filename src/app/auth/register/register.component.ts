import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  // Formularios reactivos
  public registerForm = this.fb.group({
    nombre: ['Fernando2', [Validators.required, Validators.minLength(3)]],
    // email: ['', [Validators.required, Validators.email]],
    email: ['fernando2@fernando.es', [Validators.required, Validators.pattern(this.emailPattern)]],
    passwd: ['1234567', [Validators.required, Validators.minLength(6)]],
    passwd2: ['1234567', [Validators.required, Validators.minLength(6)]],
    terminos: [true, Validators.required]
  }
    , { validators: this.passwordsIguales('passwd', 'passwd2') }
  );

  private formSubmitted = false;

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) {
  }

  ngOnInit() { }

  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let usuarioObtenido: Usuario;
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (response: any) => {
        const { email, google, nombre, role, uid } = response.usuario;
        usuarioObtenido = new Usuario(nombre, email, 'NO_ROLE', '', google, role, uid);
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        console.warn('Usuario add err:', err.error.msg);
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Entendido!'
        });
      },
      () => console.log(`Complete! ${usuarioObtenido.nombre}`)
    );
  }

  campoNoValido(field: string): boolean {
    if (this.formSubmitted) {
      return this.registerForm.get(field).invalid;
    }
    return false;
  }

  terminoAceptado(field: string): boolean {
    return this.formSubmitted && !this.registerForm.get(field).value;
  }

  contrasenasNoValidas(): boolean {
    if (this.formSubmitted && this.registerForm.get('passwd').value !== this.registerForm.get('passwd2').value) {
      return true;
    }
    return false;
  }

  passwordsIguales(fieldName1: string, fieldName2: string) {
    return (formGroup: AbstractControl) => {
      const field1Control = formGroup.get(fieldName1);
      const field2Control = formGroup.get(fieldName2);
      if (field1Control.value === field2Control.value) {
        field2Control.setErrors(null);
      } else {
        field2Control.setErrors({ noEsIgual: true });
      }
    };
  }

}
