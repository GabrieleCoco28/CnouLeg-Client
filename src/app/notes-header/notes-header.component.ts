import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notes-header',
  templateUrl: './notes-header.component.html',
  styleUrl: './notes-header.component.scss',
})
export class NotesHeaderComponent {
  @ViewChild('themeIcon', {read: ElementRef}) themeIcon!: ElementRef<HTMLElement>;
  toggleTheme() {
    if (document.body.className.includes('light-theme')) {
      document.body.className = 'mat-typography dark-theme';
      this.themeIcon.nativeElement.innerText = "dark_mode";
      localStorage.setItem("cnouleg-theme", "dark-theme");
    } else {
      document.body.className = 'mat-typography light-theme';
      this.themeIcon.nativeElement.innerText = "light_mode";
      localStorage.setItem("cnouleg-theme", "light-theme");
    }
  }

  getTheme() {
    return document.body.className.includes('dark-theme') ? "dark_mode" : "light_mode";
  }
}
