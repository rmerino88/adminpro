import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'cloudinaryimagenurl'
})
export class CloudinaryImgUrlPipe implements PipeTransform {

  baseImageUrl = `${environment.base_url}/upload`;
  cloudionaryBaseUrl = environment.cloudinary_download_url;

  transform(img: string, tipo: 'usuarios' | 'hospitales' | 'medicos', ...args: unknown[]): string {
    if (img && img.includes(this.cloudionaryBaseUrl)) {
      return img;
    } else {
      return `${this.baseImageUrl}/${tipo}/no-image`;
    }

  }
}
