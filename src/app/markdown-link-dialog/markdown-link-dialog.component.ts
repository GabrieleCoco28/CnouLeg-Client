import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarkdownEditorComponent } from '../markdown-editor/markdown-editor.component';
import { TranslatorService } from '../translator.service';

export interface LinkDialogData {
  text: string;
  link: string;
}

@Component({
  selector: 'app-markdown-link-dialog',
  templateUrl: './markdown-link-dialog.component.html',
  styleUrl: './markdown-link-dialog.component.scss'
})
export class MarkdownLinkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MarkdownEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LinkDialogData,
    public translator: TranslatorService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
