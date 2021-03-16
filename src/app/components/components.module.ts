import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { BrowserModule } from '@angular/platform-browser';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ChartsModule
  ],
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent
  ],
  providers: [
    ThemeService
  ]
})
export class ComponentsModule { }
