import { NgModule } from '@angular/core';
import { ImagenUrlPipe } from './imagen-url.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ ImagenUrlPipe ],
  // es necesario el common module para el correcto funcionamiento de este módulo
  imports: [ CommonModule ],
  exports: [ ImagenUrlPipe ]
})
export class PipesModule { }

