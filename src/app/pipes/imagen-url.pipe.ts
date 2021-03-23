import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagenurl'
})
export class ImagenUrlPipe implements PipeTransform {

  baseImageUrl = `${environment.base_url}/upload`;

  transform(img: string, tipo: 'usuarios' | 'hospitales' | 'medicos', ...args: unknown[]): string {
    // args[0] --> se envía google
    if (!img) {
      return `${this.baseImageUrl}/${tipo}/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else {
      return `${this.baseImageUrl}/${tipo}/${img}`;
    }

  }
}
