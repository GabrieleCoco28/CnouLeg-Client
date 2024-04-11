import { Component } from '@angular/core';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-note-not-found',
  templateUrl: './note-not-found.component.html',
  styleUrl: './note-not-found.component.scss'
})
export class NoteNotFoundComponent {
  constructor(public translator: TranslatorService) {}
}
