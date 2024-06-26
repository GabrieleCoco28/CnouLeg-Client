import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CnouLegAPIService, Note } from '../cnou-leg-api.service';
import { TranslatorService } from '../translator.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarCopiedToClipboardComponent } from '../snack-bar-copied-to-clipboard/snack-bar-copied-to-clipboard.component';

@Component({
  selector: 'app-notes-header',
  templateUrl: './notes-header.component.html',
  styleUrl: './notes-header.component.scss',
})
export class NotesHeaderComponent {
  @Input() data!: Note;
  public isCurrentUser = false;

  @ViewChild('themeIcon', { read: ElementRef })
  themeIcon!: ElementRef<HTMLElement>;
  @ViewChild('avatar', { read: ElementRef }) avatar!: ElementRef<HTMLElement>;
  @ViewChild('buttons', { read: ElementRef }) buttons!: ElementRef<HTMLElement>;

  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public translator: TranslatorService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
  }
  
  ngOnChanges() {
    if(this.data) {
      this.isCurrentUser = this.data.author_id === this.cnoulegAPIService.getUserIdFromJWT();
    }
  }

  toggleTheme() {
    if (document.body.className.includes('light-theme')) {
      document.body.className = 'mat-typography dark-theme';
      this.themeIcon.nativeElement.innerText = 'dark_mode';
      localStorage.setItem('cnouleg-theme', 'dark-theme');
    } else {
      document.body.className = 'mat-typography light-theme';
      this.themeIcon.nativeElement.innerText = 'light_mode';
      localStorage.setItem('cnouleg-theme', 'light-theme');
    }
  }

  getTheme() {
    return document.body.className.includes('dark-theme')
      ? 'dark_mode'
      : 'light_mode';
  }
  ngAfterViewInit() {
    this.auth();
  }

  auth() {
    if (localStorage.getItem('access_token')) {
      this.cnoulegAPIService.auth().subscribe({
        next: (v) => {
          this.avatar.nativeElement.style.display = 'block';
          this.buttons.nativeElement.style.display = 'none';
          this.cnoulegAPIService.getUserByJwt().subscribe((v) => {
            if (v.users[0].profile_pic_url === '')
              this.avatar.nativeElement.style.backgroundImage = `url(../../assets/default.svg)`;
            else
              this.avatar.nativeElement.style.backgroundImage = `url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.users[0].profile_pic_url})`;
          });
        },
        error: (v) => {
          this.avatar.nativeElement.style.display = 'none';
          this.buttons.nativeElement.style.display = 'block';
        },
      });
    }
  }

  copyUrlToClipboard() {
    navigator.clipboard.writeText(document.location.href);
    this.snackBar.openFromComponent(SnackBarCopiedToClipboardComponent, {
      duration: 2000,
    });
  }

  back() {
    history.back();
  }
}
