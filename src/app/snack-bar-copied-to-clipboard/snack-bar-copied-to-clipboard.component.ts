import { Component } from '@angular/core';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-snack-bar-copied-to-clipboard',
  templateUrl: './snack-bar-copied-to-clipboard.component.html',
  styleUrl: './snack-bar-copied-to-clipboard.component.scss'
})
export class SnackBarCopiedToClipboardComponent {
  constructor(public translator: TranslatorService) {}
}
