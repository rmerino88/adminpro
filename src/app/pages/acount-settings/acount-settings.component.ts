import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: []
})
export class AcountSettingsComponent implements OnInit {

  private linkTheme: Element = document.querySelector('#theme');
  public currentTheme: string = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'purple-dark';

  constructor() { }

  ngOnInit() {
    document.querySelector(`a[data-theme="${this.currentTheme}"]`).classList.add('working');
  }

  /**
   * Cambia el valor de la url que indica el tema seleccionado
   * Llama a setAsSelected y guarda la elección el el localStorage
   * @param theme Tema escogido
   */
  changeTheme(theme: string) {
    this.linkTheme.setAttribute('href', `./assets/css/colors/${theme}.css`);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    this.setAsSelected();
  }

  /**
   * Recibe el tema escogido, desmarca el actual y marca el seleccionado.
   * @param theme Tema escogido
   */
  private setAsSelected() {
    const selected = document.querySelector('a[class*="working"]')
    if (selected) {
      selected.classList.remove('working');
    }
    /**
     * Si pondríamos ngClass con id correpsondiente a cada uno de ellos
     * [ngClass]="{'working': currentTheme === 'default-dark'}"
     * Obtendríamos el mismo resultado
     */
    document.querySelector(`a[data-theme="${this.currentTheme}"]`).classList.add('working');
  }
}
