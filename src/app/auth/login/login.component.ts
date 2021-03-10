import { Component, NgZone, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginService } from '../../services/login.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  // Formulario reactivo
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email'), [Validators.required, Validators.pattern(this.emailPattern)]],
    passwd: ['', [Validators.required, Validators.minLength(6)]],
    recuerdame: [false]
  });

  private formSubmitted = false;
  public auth2: any;

  constructor(private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.renderButton();
  }

  login() {

    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe(
      (response: any) => {
        if (this.loginForm.get('recuerdame').value) {
          // Guardar las preferencias del usuario, ¿recuerdame?
          localStorage.setItem('email', this.loginForm.get('email').value);
          // localStorage.setItem('passwd', this.loginForm.get('passwd').value);
        } else {
          localStorage.removeItem('email');
          // localStorage.removeItem('passwd');
        }
        this.router.navigateByUrl('/dashboard');
      },
      err => {
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Entendido!'
        });
      },
      () => console.log(`Complete!`)
    );
  }

  campoNoValido(field: string): boolean {
    if (this.formSubmitted) {
      return this.loginForm.get(field).invalid;
    }
    return false;
  }

  /**Al estar definido en el renderButton-render,
   * se pierden las referencias del this a la clase padre.
   * Es decir no pdoemso acceder a atributos/métodos definidos
   * dentro de la clase a través del this.
   */
  onSuccess(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token;
    console.log('id_token: ' + id_token);
  }

  onFailure(error) {
    console.log(error);
  }

  private renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 200,
      height: 40,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure
    });

    this.startApp();
  }

  // Las funciones normales/clasicas, modifican el this, las => no
  private async startApp() {
    // gapi.load('auth2', () => {
    //   // Retrieve the singleton for the GoogleAuth library and set up the client.
    //   this.auth2 = gapi.auth2.init({
    //     client_id: '1056987659897-h67o3g721r2o8ovul342fmiudpudm8hm.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     // Request scopes in addition to 'profile' and 'email'
    //     // scope: 'additional_scope'
    //   });
    // });

    await this.loginService.googleInit();
    this.auth2 = this.loginService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  private attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log('id_token: ' + id_token);
        this.loginService.loginGoogle( id_token ).subscribe(
          () => {
            this.ngZone.run( () => this.router.navigateByUrl('/dashboard') );
          }
        );
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
