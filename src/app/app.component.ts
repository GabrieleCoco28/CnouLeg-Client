import { transition, trigger, useAnimation } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import {
  fromLeftEasing,
  fromRightEasing,
  moveFromLeft,
  moveFromRight,
} from 'ngx-router-animations';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'CnouLeg-Client';
  constructor() {
    if(localStorage.getItem("cnouleg-theme")) {
      document.body.className = 'mat-typography ' + localStorage.getItem("cnouleg-theme");
    } else {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      document.body.className = darkThemeMq.matches ? 'mat-typography dark-theme' : 'mat-typography light-theme';
    }
  }
}
