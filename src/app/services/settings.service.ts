import { Injectable } from '@angular/core';
/**
 * Como lleva el provideIn no hayq ue incluirlo en ningun módulo,
 * ya que es inejctable
 */
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme: Element  = document.querySelector('#theme');

  constructor() { }

  establishTheme() {
    const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'purple-dark';
    this.linkTheme.setAttribute('href', `./assets/css/colors/${theme}.css`);
  }

  changeTheme(theme: string) {
    this.linkTheme.setAttribute('href', `./assets/css/colors/${theme}.css`);
    localStorage.setItem('theme', theme);
  }

  setAsSelected(currentTheme: string) {
    const selected = document.querySelector('a[class*="working"]')
    if (selected) {
      selected.classList.remove('working');
    }
    document.querySelector(`a[data-theme="${currentTheme}"]`).classList.add('working');
  }
}
