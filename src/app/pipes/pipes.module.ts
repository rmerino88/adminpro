import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenUrlPipe } from './imagen-url.pipe';
import { CloudinaryImgUrlPipe } from './cloudinary-img-url.pipe';

@NgModule({
  declarations: [ ImagenUrlPipe, CloudinaryImgUrlPipe ],
  // es necesario el common module para el correcto funcionamiento de este módulo
  imports: [ CommonModule ],
  exports: [ ImagenUrlPipe, CloudinaryImgUrlPipe ]
})
export class PipesModule { }

