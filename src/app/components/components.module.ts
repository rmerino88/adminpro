import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { BrowserModule } from '@angular/platform-browser';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule, ThemeService } from 'ng2-charts';

@NgModule({
  imports: [
      FormsModule,
      BrowserModule,
      ChartsModule
  ],
  declarations: [
      IncrementadorComponent,
      DonaComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent
  ],
  providers:[
    ThemeService
  ]
})
export class ComponentsModule { }
