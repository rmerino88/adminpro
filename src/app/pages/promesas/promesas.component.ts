import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const promesas = new Promise( ( resolve, reject ) => {
      // resolve('Todo correcto');
      reject('Algo salió mal');
    });

    promesas
      .then(console.log)
      .catch(console.warn)
      .finally(() => {
        console.log('Proceso finalizado');
      });

    this.getUsuarios().then(console.log);

    console.log('Fin del ngOnInit');
  }

  getUsuarios() {

    // fetch('https://reqres.in/api/users?page=2').then( (res) => {
    //   res.json().then(console.log);
    // });

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users?page=2')
        .then( res => res.json())
        .then( body => resolve(body.data) );
    });

  }

}
