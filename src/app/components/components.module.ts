import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { DonaComponent } from './dona/dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { ModalMedicoComponent } from './modal-medico/modal-medico.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    ChartsModule
  ],
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ModalMedicoComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImagenComponent,
    ModalMedicoComponent
  ],
  providers: [
    ThemeService
  ]
})
export class ComponentsModule { }
