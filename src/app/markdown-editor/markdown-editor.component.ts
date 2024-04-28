import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { TranslatorService } from '../translator.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER, L } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MermaidAPI } from 'ngx-markdown';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { MarkdownLinkDialogComponent } from '../markdown-link-dialog/markdown-link-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { validateImage } from 'image-validator';
import { CnouLegAPIService } from '../cnou-leg-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.scss',
})
export class MarkdownEditorComponent {
  @ViewChild('titleRef') titleRef!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionRef') descriptionRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('markdownRef') markdownRef!: ElementRef<HTMLTextAreaElement>;
  public schoolValue = "other";
  public subjectValue = "other";

  readonly copyComponent = CopyButtonComponent;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public addOnBlur = true;
  public tags: string[] = [];
  public mdSelection = { start: 0, end: 0 };
  public cursorPosition = 0;

  public text = '';
  public link = '';


  public languages = [
    'c',
    'cpp',
    'csharp',
    'css',
    'java',
    'javascript',
    'json',
    'markup',
    'typescript',
  ].sort();

  public announcer = inject(LiveAnnouncer);

  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Dark,
  };

  public loadedImages: any[] = [];
  public loadedVideos: File[] = [];
  public loadedDocuments: File[] = [];

  constructor(
    public translator: TranslatorService,
    public linkDialog: MatDialog,
    public cnoulegAPIService: CnouLegAPIService,
    public router: Router
  ) {}

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
    this.cursorPosition = (e.target as HTMLTextAreaElement).selectionStart;
  }

  setCursorPosition(e: Event) {
    this.cursorPosition = (e.target as HTMLTextAreaElement).selectionStart;
  }

  resetSelection() {
    this.mdSelection.start = 0;
    this.mdSelection.end = 0;
  }

  insertChars(chars: string) {
    if (this.mdSelection.start === this.mdSelection.end) {
      this.markdownRef.nativeElement.value =
        this.markdownRef.nativeElement.value.substring(
          0,
          this.mdSelection.start
        ) +
        chars +
        chars +
        this.markdownRef.nativeElement.value.substring(
          this.mdSelection.end,
          this.markdownRef.nativeElement.value.length
        );
      setTimeout(() => {
        this.markdownRef.nativeElement.focus();
      });
      this.cursorPosition = this.mdSelection.start + chars.length;
      this.markdownRef.nativeElement.selectionStart = this.cursorPosition;
      this.markdownRef.nativeElement.selectionEnd = this.cursorPosition;
    } else {
      this.markdownRef.nativeElement.value =
        this.markdownRef.nativeElement.value.substring(
          0,
          this.mdSelection.start
        ) +
        chars +
        this.markdownRef.nativeElement.value.substring(
          this.mdSelection.start,
          this.mdSelection.end
        ) +
        chars +
        this.markdownRef.nativeElement.value.substring(
          this.mdSelection.end,
          this.markdownRef.nativeElement.value.length
        );
      setTimeout(() => {
        this.markdownRef.nativeElement.focus();
      });
      this.markdownRef.nativeElement.selectionStart =
        this.mdSelection.start + chars.length;
      this.markdownRef.nativeElement.selectionEnd =
        this.mdSelection.start +
        Math.abs(this.mdSelection.end - this.mdSelection.start) +
        chars.length;
      this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
      this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
      this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
    }
  }

  insertHorizontalLine() {
    let pos = this.markdownRef.nativeElement.value.length;
    for (
      let i = this.cursorPosition;
      i < this.markdownRef.nativeElement.value.length;
      i++
    ) {
      if (this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value =
      this.markdownRef.nativeElement.value.substring(0, pos) +
      '\n\n --- \n' +
      this.markdownRef.nativeElement.value.substring(pos);
    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    });
    this.markdownRef.nativeElement.selectionStart = pos + 9;
    this.markdownRef.nativeElement.selectionEnd = pos + 9;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertTable() {
    let pos = this.markdownRef.nativeElement.value.length;
    for (
      let i = this.cursorPosition;
      i < this.markdownRef.nativeElement.value.length;
      i++
    ) {
      if (this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value =
      this.markdownRef.nativeElement.value.substring(0, pos) +
      '\n\n| Column 1 | Column 2 |\n| -------- | -------- |\n| Content  | Content  |\n| Content  | Content  |\n\n' +
      this.markdownRef.nativeElement.value.substring(pos);

    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    });
    this.markdownRef.nativeElement.selectionStart = pos + 99;
    this.markdownRef.nativeElement.selectionEnd = pos + 99;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertLatex() {
    let pos = this.markdownRef.nativeElement.value.length;
    for (
      let i = this.cursorPosition;
      i < this.markdownRef.nativeElement.value.length;
      i++
    ) {
      if (this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value =
      this.markdownRef.nativeElement.value.substring(0, pos) +
      '\n\n$$\n\n$$\n' +
      this.markdownRef.nativeElement.value.substring(pos);
    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    });
    this.markdownRef.nativeElement.selectionStart = pos + 5;
    this.markdownRef.nativeElement.selectionEnd = pos + 5;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertCodeBlock(language: string) {
    let pos = this.markdownRef.nativeElement.value.length;
    for (
      let i = this.cursorPosition;
      i < this.markdownRef.nativeElement.value.length;
      i++
    ) {
      if (this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        pos = i;
        break;
      }
    }
    this.markdownRef.nativeElement.value =
      this.markdownRef.nativeElement.value.substring(0, pos) +
      '\n\n```' +
      language +
      '\n\n```' +
      this.markdownRef.nativeElement.value.substring(pos);
    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    });
    this.markdownRef.nativeElement.selectionStart = pos + 6 + language.length;
    this.markdownRef.nativeElement.selectionEnd = pos + 6 + language.length;
    this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
    this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
    this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
  }

  insertInLineStarts(chars: string) {
    let positions = [];
    for (let i = this.mdSelection.end - 1; i >= this.mdSelection.start; i--) {
      if (this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        positions.push(i + 1);
      }
    }
    for (let i = this.mdSelection.start - 1; i >= 0; i--) {
      if (this.markdownRef.nativeElement.value.charAt(i) === '\n') {
        positions.push(i + 1);
        break;
      }
      if (i === 0) positions.push(i);
    }
    if (this.mdSelection.start === 0) positions.push(0);

    for (let i = positions.length - 1; i >= 0; i--) {
      const value = this.markdownRef.nativeElement.value;
      this.markdownRef.nativeElement.value =
        value.substring(
          0,
          positions[i] + chars.length * (positions.length - i - 1)
        ) +
        chars +
        value.substring(
          positions[i] + chars.length * (positions.length - i - 1)
        );
    }

    setTimeout(() => {
      this.markdownRef.nativeElement.focus();
    });
  }

  insertImage() {
    const dialogRef = this.linkDialog.open(MarkdownLinkDialogComponent, {
      data: { text: this.text, link: this.link },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      this.text = data.text;
      this.link = data.link;

      let pos = this.markdownRef.nativeElement.value.length;
      for (
        let i = this.cursorPosition;
        i < this.markdownRef.nativeElement.value.length;
        i++
      ) {
        if (this.markdownRef.nativeElement.value.charAt(i) === '\n') {
          pos = i;
          break;
        }
      }
      this.markdownRef.nativeElement.value =
        this.markdownRef.nativeElement.value.substring(0, pos) +
        '\n![' +
        this.text +
        '](' +
        this.link +
        ')\n' +
        this.markdownRef.nativeElement.value.substring(pos);
      setTimeout(() => {
        this.markdownRef.nativeElement.focus();
      });
      this.markdownRef.nativeElement.selectionStart =
        pos + this.text.length + this.link.length + 5;
      this.markdownRef.nativeElement.selectionEnd =
        pos + this.text.length + this.link.length + 5;
      this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
      this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
      this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
      this.text = '';
      this.link = '';
    });
  }

  insertLink() {
    const dialogRef = this.linkDialog.open(MarkdownLinkDialogComponent, {
      data: { text: this.text, link: this.link },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      this.text = data.text;
      this.link = data.link;

      if (this.mdSelection.start === this.mdSelection.end) {
        this.markdownRef.nativeElement.value =
          this.markdownRef.nativeElement.value.substring(
            0,
            this.mdSelection.start
          ) +
          `[${this.text}](${this.link})` +
          this.markdownRef.nativeElement.value.substring(
            this.mdSelection.end,
            this.markdownRef.nativeElement.value.length
          );
        setTimeout(() => {
          this.markdownRef.nativeElement.focus();
        });
        this.cursorPosition =
          this.mdSelection.start + (this.text.length + this.link.length) + 3;
        this.markdownRef.nativeElement.selectionStart = this.cursorPosition;
        this.markdownRef.nativeElement.selectionEnd = this.cursorPosition;
      } else {
        this.markdownRef.nativeElement.value =
          this.markdownRef.nativeElement.value.substring(
            0,
            this.mdSelection.start
          ) +
          `[${this.text}](${this.link})` +
          this.markdownRef.nativeElement.value.substring(
            this.mdSelection.start,
            this.mdSelection.end
          ) +
          `[${this.text}](${this.link})` +
          this.markdownRef.nativeElement.value.substring(
            this.mdSelection.end,
            this.markdownRef.nativeElement.value.length
          );
        setTimeout(() => {
          this.markdownRef.nativeElement.focus();
        });
        this.markdownRef.nativeElement.selectionStart =
          this.mdSelection.start + (this.text.length + this.link.length) + 3;
        this.markdownRef.nativeElement.selectionEnd =
          this.mdSelection.start +
          Math.abs(this.mdSelection.end - this.mdSelection.start) +
          (this.text.length + this.link.length) +
          3;
        this.mdSelection.start = this.markdownRef.nativeElement.selectionStart;
        this.mdSelection.end = this.markdownRef.nativeElement.selectionEnd;
        this.cursorPosition = this.markdownRef.nativeElement.selectionStart;
      }

      this.text = '';
      this.link = '';
    });
  }

  onChangeImage(event: Event) {
    if (event.target !== null) {
      const isValidImage = validateImage((event.target as HTMLInputElement).files![0]).then((isvalid) => {
        if(!isvalid) return;
        this.loadedImages.push({
          file: (event.target as HTMLInputElement).files![0],
          link: URL.createObjectURL((event.target as HTMLInputElement).files![0]),
        });
      })
    }
  }

  deleteImage(index: number) {
    this.loadedImages.splice(index, 1);
  }

  onChangeVideo(event: Event) {
    if (event.target !== null) {
      this.loadedVideos.push((event.target as HTMLInputElement).files![0]);
    }
  }

  deleteVideo(index: number) {
    this.loadedVideos.splice(index, 1);
  }

  onChangeDocument(event: Event) {
    if (event.target !== null) {
      this.loadedDocuments.push((event.target as HTMLInputElement).files![0]);
    }
  }

  deleteDocument(index: number) {
    this.loadedDocuments.splice(index, 1);
  }

  setSchool(school: string) {
    this.schoolValue = school;
  }

  setSubject(subject: string) {
    this.subjectValue = subject;
  }

  uploadNote() {

    if(this.markdownRef.nativeElement.value.trim().length < 100 || this.descriptionRef.nativeElement.value.trim().length <= 0 || this.titleRef.nativeElement.value.trim().length <= 0) return;

    let images = [];
    for(let i = 0; i < this.loadedImages.length; i++) {
      images.push(this.loadedImages[i].file);
    }
    this.cnoulegAPIService.uploadNote(images, this.loadedVideos, 
      this.loadedDocuments, this.titleRef.nativeElement.value, this.subjectValue, this.schoolValue, this.tags, 
      this.descriptionRef.nativeElement.value, this.markdownRef.nativeElement.value).subscribe(
       {
        next: () => {
          this.router.navigateByUrl("/");
        },
        error: (e) => {
          console.error(e);
        }
       }
      );
  }

}