import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TranslatorService } from '../translator.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MermaidAPI } from 'ngx-markdown';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { MarkdownLinkDialogComponent } from '../markdown-link-dialog/markdown-link-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.scss'
})
export class MarkdownEditorComponent {
  @ViewChild('markdownRef') markdownRef!: ElementRef<HTMLTextAreaElement>;
  readonly copyComponent = CopyButtonComponent;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  tags: string[] = [];
  mdSelection = {start: 0, end: 0};
  cursorPosition = 0;

  text = "";
  link = "";

  public languages = ['c', 'cpp','csharp', 'css', 'java', 'javascript', 'json', 'markup', 'typescript'].sort();
  
  announcer = inject(LiveAnnouncer);

  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Dark,
  };

  constructor(public translator: TranslatorService, public linkDialog: MatDialog) {}

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  public edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  public keys(object: Object) {
    return Object.keys(object);
  }

  selectionChange(e: Event) {
    this.mdSelection.start = (e.target as HTMLTextAreaElement).selectionStart;
    this.mdSelection.end = (e.target as HTMLTextAreaElement).selectionEnd;
    this.cursorPosition = (e.target as HTMLTextAreaElement).selectionStart
    console.log(this.mdSelection);
  }
  
  setCursorPosition(e: Event) {
    this.cursorPosition = (e.target as HTMLTextAreaElement).selectionStart
  }

  resetSelection() {
    this.mdSelection.start = 0;
    this.mdSelection.end = 0;
  }
  
  insertChars(chars: string) {
    if(this.mdSelection.start === this.mdSelection.end ) {
      this.markdownRef.nativeElement.value = this.markdownRef.nativeElement.value.substring(0, this.mdSelection.start) + chars + chars + this.markdownRef.nativeElement.value.substring(this.mdSelection.end, this.markdownRef.nativeElement.value.length);
      setTimeout(() => {
        this.markdownRef.nativeElement.focus();
      })
      this.cursorPosition = this.mdSelection.start + chars.length;
      this.markdownRef.nativeElement.selectionStart = this.cursorPosition;
      this.markdownRef.nativeElement.selectionEnd = this.cursorPosition;
    }else {
      this.markdownRef.nativeElement.value = 
        this.markdownRef.nativeElement.value.substring(0, this.mdSelection.start) + chars + 
        this.markdownRef.nativeElement.value.substring(this.mdSelection.start, this.mdSelection.end) + chars + 
        this.markdownRef.nativeElement.value.substring(this.mdSelection.end, this.markdownRef.nativeElement.value.length);
        setTimeout(() => {
          this.markdownRef.nativeElement.focus();
        })
        this.markdownRef.nativeElement.selectionStart = this.mdSelection.start + chars.length;
        this.markdownRef.nativeElement.selectionEnd = this.mdSelection.start + Math.abs(this.mdSelection.end - this.mdSelection.start) + chars.length;
        this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
        this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
        this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
    }
  }

  insertHorizontalLine() {
    let pos = this.markdownRef.nativeElement.value.length;
    for(let i = this.cursorPosition; i < this.markdownRef.nativeElement.value.length;  i++) {
      if(this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value = this.markdownRef.nativeElement.value.substring(0, pos) + "\n\n --- \n" + this.markdownRef.nativeElement.value.substring(pos);
    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    })
    this.markdownRef.nativeElement.selectionStart = pos + 9;
    this.markdownRef.nativeElement.selectionEnd = pos + 9;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertTable() {
    let pos = this.markdownRef.nativeElement.value.length;
    for(let i = this.cursorPosition; i < this.markdownRef.nativeElement.value.length;  i++) {
      if(this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value = this.markdownRef.nativeElement.value.substring(0, pos) + 
    "\n\n| Column 1 | Column 2 |\n| -------- | -------- |\n| Content  | Content  |\n| Content  | Content  |\n\n" + 
    this.markdownRef.nativeElement.value.substring(pos);

    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    })
    this.markdownRef.nativeElement.selectionStart = pos + 99;
    this.markdownRef.nativeElement.selectionEnd = pos + 99;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertLatex() {
    let pos = this.markdownRef.nativeElement.value.length;
    for(let i = this.cursorPosition; i < this.markdownRef.nativeElement.value.length;  i++) {
      if(this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value = this.markdownRef.nativeElement.value.substring(0, pos) + "\n\n$$\n\n$$\n" + this.markdownRef.nativeElement.value.substring(pos);
    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    })
    this.markdownRef.nativeElement.selectionStart = pos + 5;
    this.markdownRef.nativeElement.selectionEnd = pos + 5;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertCodeBlock(language: string) {
    let pos = this.markdownRef.nativeElement.value.length;
    for(let i = this.cursorPosition; i < this.markdownRef.nativeElement.value.length;  i++) {
      if(this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value = this.markdownRef.nativeElement.value.substring(0, pos) + "\n\n```" + language + "\n\n```" + this.markdownRef.nativeElement.value.substring(pos);
    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    })
    this.markdownRef.nativeElement.selectionStart = pos + 6 + language.length;
    this.markdownRef.nativeElement.selectionEnd = pos + 6 + language.length;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertInLineStarts(chars: string) {
    let positions = [];
    for(let i = this.mdSelection.end - 1; i >= this.mdSelection.start; i--) {
      if(this.markdownRef.nativeElement.value.charAt(i) === '\n'){ 
        positions.push(i + 1);
      }
    }
    for(let i = this.mdSelection.start - 1; i >= 0; i--) {
      if(this.markdownRef.nativeElement.value.charAt(i) === '\n'){
        positions.push(i + 1);
        break;
      }
      if(i === 0)
        positions.push(i);
    }
    if(this.mdSelection.start === 0)
      positions.push(0);

    for(let i = positions.length - 1; i >= 0; i--) {
      const value = this.markdownRef.nativeElement.value;
      this.markdownRef.nativeElement.value = value.substring(0, positions[i] + chars.length*(positions.length - i - 1)) + chars + 
                                             value.substring(positions[i] + chars.length*(positions.length - i - 1))
    }

    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    })
  }

  insertImage() {
    const dialogRef = this.linkDialog.open(MarkdownLinkDialogComponent, {
      data: {text: this.text, link: this.link},
    });

    dialogRef.afterClosed().subscribe(data => {
      if(!data) return;
      this.text = data.text;
      this.link = data.link;

      let pos = this.markdownRef.nativeElement.value.length;
      for(let i = this.cursorPosition; i < this.markdownRef.nativeElement.value.length;  i++) {
        if(this.markdownRef.nativeElement.value.charAt(i) === '\n') {
          pos = i;
          break;
        }
      }
      this.markdownRef.nativeElement.value = this.markdownRef.nativeElement.value.substring(0, pos) + "\n![" + this.text + "](" + this.link + ")\n" + this.markdownRef.nativeElement.value.substring(pos);
      setTimeout(() => {
        this.markdownRef.nativeElement.focus();
      })
      this.markdownRef.nativeElement.selectionStart = pos + this.text.length + this.link.length + 5;
      this.markdownRef.nativeElement.selectionEnd = pos + this.text.length + this.link.length + 5;
      this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
      this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
      this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
      this.text = '';
      this.link = '';
    });
  }

  insertLink() {
    const dialogRef = this.linkDialog.open(MarkdownLinkDialogComponent, {
      data: {text: this.text, link: this.link},
    });

    dialogRef.afterClosed().subscribe(data => {
      if(!data) return;
      this.text = data.text;
      this.link = data.link;

      if(this.mdSelection.start === this.mdSelection.end ) {
        this.markdownRef.nativeElement.value = this.markdownRef.nativeElement.value.substring(0, this.mdSelection.start) + `[${this.text}](${this.link})` + this.markdownRef.nativeElement.value.substring(this.mdSelection.end, this.markdownRef.nativeElement.value.length);
        setTimeout(() => {
          this.markdownRef.nativeElement.focus();
        })
        this.cursorPosition = this.mdSelection.start + (this.text.length + this.link.length) + 3;
        this.markdownRef.nativeElement.selectionStart = this.cursorPosition;
        this.markdownRef.nativeElement.selectionEnd = this.cursorPosition;
      }else {
        this.markdownRef.nativeElement.value = 
          this.markdownRef.nativeElement.value.substring(0, this.mdSelection.start) + `[${this.text}](${this.link})` + 
          this.markdownRef.nativeElement.value.substring(this.mdSelection.start, this.mdSelection.end) + `[${this.text}](${this.link})` + 
          this.markdownRef.nativeElement.value.substring(this.mdSelection.end, this.markdownRef.nativeElement.value.length);
          setTimeout(() => {
            this.markdownRef.nativeElement.focus();
          })
          this.markdownRef.nativeElement.selectionStart = this.mdSelection.start + (this.text.length + this.link.length) + 3;
          this.markdownRef.nativeElement.selectionEnd = this.mdSelection.start + Math.abs(this.mdSelection.end - this.mdSelection.start) + (this.text.length + this.link.length) + 3;
          this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
          this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
          this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
      }

      this.text = '';
      this.link = '';
    });
  }
}