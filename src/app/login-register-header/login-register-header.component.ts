import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-register-header',
  templateUrl: './login-register-header.component.html',
  styleUrl: './login-register-header.component.scss'
})
export class LoginRegisterHeaderComponent {
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

  back() {
    history.back();
  }
}
