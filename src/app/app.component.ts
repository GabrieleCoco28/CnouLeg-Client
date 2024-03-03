import { Component } from '@angular/core';
import { CopyButtonComponent } from './copy-button/copy-button.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CnouLeg-Client';
  readonly copyComponent = CopyButtonComponent;
}
