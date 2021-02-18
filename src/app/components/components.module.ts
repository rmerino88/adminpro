import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
  imports: [
      FormsModule
  ],
  declarations: [
      IncrementadorComponent
  ],
  exports: [
    IncrementadorComponent
  ]
})
export class ComponentsModule { }
