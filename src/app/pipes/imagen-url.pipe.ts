import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagenurl'
})
export class ImagenUrlPipe implements PipeTransform {

  baseImageUrl = `${environment.base_url}/upload/usuarios`;

  transform(img: string, ...args: unknown[]): string {
    // console.log(img);

    if (img) {
        if (args[0]) {
            return img;
        } else {
            return `${this.baseImageUrl}/${img}`;
        }
    } else {
        return `${this.baseImageUrl}/no-image`;
    }
  }

}
