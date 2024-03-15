import { transition, trigger, useAnimation } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { fromLeftEasing, fromRightEasing, moveFromLeft, moveFromRight } from 'ngx-router-animations';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'CnouLeg-Client';
}
