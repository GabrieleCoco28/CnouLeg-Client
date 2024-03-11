import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { fromLeftEasing, fromRightEasing, moveFromLeft, moveFromRight } from 'ngx-router-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CnouLeg-Client';
}
