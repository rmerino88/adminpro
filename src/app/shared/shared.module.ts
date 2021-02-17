import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [ ],
    declarations: [
        /**
         * The set of selectors that are available to
         * a template include those declared here, and
         * those that are exported from imported NgModules.
         */
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        BreadcrumbsComponent,
        SidebarComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class SharedModule { }
