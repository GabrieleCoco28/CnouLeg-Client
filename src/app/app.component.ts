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
    addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') {
        if (document.body.className.includes('light-theme'))
          document.body.className = 'mat-typography dark-theme';
        else document.body.className = 'mat-typography light-theme';
      }
    });
  }
}
