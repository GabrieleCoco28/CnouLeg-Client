import { Component } from '@angular/core';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-user-not-found',
  templateUrl: './user-not-found.component.html',
  styleUrl: './user-not-found.component.scss'
})
export class UserNotFoundComponent {
  constructor(public translator: TranslatorService) {}
}
