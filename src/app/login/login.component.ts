import { Component } from '@angular/core';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;
  constructor(public translator: TranslatorService){}
}
