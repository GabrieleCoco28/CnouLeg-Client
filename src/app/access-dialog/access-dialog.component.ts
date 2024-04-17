import { Component } from '@angular/core';
import { TranslatorService } from '../translator.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-access-dialog',
  templateUrl: './access-dialog.component.html',
  styleUrl: './access-dialog.component.scss',
})
export class AccessDialogComponent {
  constructor(public translator: TranslatorService, public dialog: MatDialog) {}
  closeDialog() {
    this.dialog.closeAll();
  }
}
