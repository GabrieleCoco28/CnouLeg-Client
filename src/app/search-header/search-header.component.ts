import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss'
})
export class SearchHeaderComponent {
  @ViewChild('themeIcon', {read: ElementRef}) themeIcon!: ElementRef<HTMLElement>;
  constructor(public translator: TranslatorService){}
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
