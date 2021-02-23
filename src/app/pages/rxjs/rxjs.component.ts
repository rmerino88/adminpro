import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs: Subscription;

  constructor(private http: HttpClient) {

    // El observer es de tipo Subscriber
    // let i = 0;

    // const obs$ = new Observable<number>(observer => {
    //   const intervalo = setInterval(() => {
    //     if (i > 2) {
    //       i = 0;
    //       observer.error('Error!');
    //     }
    //     if (i > 5) {
    //       // clearInterval(intervalo);
    //       observer.complete();
    //     }
    //     observer.next(i);
    //     i++;
    //   }, 1000);
    // });

    // setTimeout(() => {

    //   // obs$.pipe(
    //   this.retornaObservable().pipe(
    //     // Numero de intentos 1
    //     retry(1)
    //   ).subscribe(
    //     valor => console.log('Subs:', valor),
    //     err => {
    //       console.warn('Subs err:', err);
    //     },
    //     () => console.log('Complete!')
    //   );
    // }, 3000);

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);

    // this.test().subscribe(console.log);
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    // return interval(1000).pipe(take(4));
    // return interval(1000).pipe(
    //   map( (valor) => {
    //      return valor + 1;
    //   })
    // );
    /**
     * Se trata de operadores que van en cadena, se ejecutan uno de trás del otro
     * Como van ene cadena no da igual el orden en que lo pongamos,
     * ya que afectará al resultado
     */
    // return interval(1000).pipe( take(10), map( valor => valor + 1 ), filter( valor => valor % 2 === 0 ) );
    // return interval(1000).pipe( map(valor => valor + 1), filter(valor => valor % 2 === 0), take(10));
    return interval(500).pipe( map(valor => valor + 1), filter(valor => valor % 2 === 0));
  }

  retornaObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        if (i > 2) {
          i = 0;
          observer.error('Error!');
        }
        if (i > 5) {
          // clearInterval(intervalo);
          observer.complete();
        }
        observer.next(i);
        i++;
      }, 1000);
    });
  }

  private test() {
    // return this.http.get('https://reqres.in/api/users?page=2').pipe( filter(response => true));
    return this.http.get('https://reqres.in/api/users?page=2');
  }
}
