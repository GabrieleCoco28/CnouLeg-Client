import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'CnouLeg-Client';
  constructor() {
    if (localStorage.getItem('cnouleg-theme')) {
      document.body.className =
        'mat-typography ' + localStorage.getItem('cnouleg-theme');
    } else {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      document.body.className = darkThemeMq.matches
        ? 'mat-typography dark-theme'
        : 'mat-typography light-theme';
    }
  }
}
