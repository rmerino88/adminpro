import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { map, take, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnDestroy {

  public pageTitle: string;
  public titleSubs$: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleSubs$ = this.getDataRoute();
    console.log(this.activatedRoute.snapshot.children);
  }

  getDataRoute() {
    // events se trata de un observable que devuelve Element
    // this.router.events.subscribe(console.log);

    // Al hacer el take(1) una vez seteado no volvía a cambiar
    // this.router.events.pipe( take(1), map( (element: any) => element.snapshot.data.title) ).subscribe( title => this.pageTitle = title);

    // this.router.events.pipe(
    //   filter(element => element instanceof ActivationEnd),
    //   filter((element: ActivationEnd) => element.snapshot.data.title),
    //   map( (element: ActivationEnd) => element.snapshot.data.title))
    // .subscribe( title => this.pageTitle = title );

    // this.router.events.pipe(
    //   filter(element => element instanceof ActivationEnd),
    //   filter((element: ActivationEnd) => element.snapshot.data.title),
    //   map((element: ActivationEnd) => element.snapshot.data))
    //   .subscribe(({ title }) => {
    //     this.pageTitle = title;
    //     document.title = `AdminPro - ${title}`;
    //   });
    return this.router.events.pipe(
      filter(element => element instanceof ActivationEnd),
      filter((element: ActivationEnd) => element.snapshot.data.title),
      map((element: ActivationEnd) => element.snapshot.data))
      .subscribe(({ title }) => {
        this.pageTitle = title;
        document.title = `AdminPro - ${title}`;
      });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

}
