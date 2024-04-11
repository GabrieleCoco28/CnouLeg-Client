import { Component } from '@angular/core';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-successful-registration',
  templateUrl: './successful-registration.component.html',
  styleUrl: './successful-registration.component.scss',
})
export class SuccessfulRegistrationComponent {
  constructor(public translator: TranslatorService) {}
}
