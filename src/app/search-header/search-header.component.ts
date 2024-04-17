import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatorService } from '../translator.service';
import { CnouLegAPIService } from '../cnou-leg-api.service';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss'
})
export class SearchHeaderComponent {
  @ViewChild('themeIcon', {read: ElementRef}) themeIcon!: ElementRef<HTMLElement>;
  @ViewChild('avatar', {read: ElementRef}) avatar!: ElementRef<HTMLElement>;
  @ViewChild('buttons', {read: ElementRef}) buttons!: ElementRef<HTMLElement>;
  constructor(public translator: TranslatorService, private cnoulegAPIService: CnouLegAPIService){}
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

  ngAfterViewInit() {
    this.auth();
  }

  auth() {
    if(localStorage.getItem('access_token')) {
      this.cnoulegAPIService.auth().subscribe({
        next: (v) => {
          this.avatar.nativeElement.style.display = 'block'
          this.buttons.nativeElement.style.display = 'none';
          this.cnoulegAPIService.getUserByJwt().subscribe((user) => {
            this.cnoulegAPIService.getUsersById([user.user_id]).subscribe((v) =>{
              if(v.users[0].profile_pic_url === "") 
                this.avatar.nativeElement.style.backgroundImage = `url(../../assets/default.svg)`
              else
                this.avatar.nativeElement.style.backgroundImage = `url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.users[0].profile_pic_url})`
            })
          })
        },
        error: (v) => {
          this.avatar.nativeElement.style.display = 'none'
          this.buttons.nativeElement.style.display = 'block';
        }
      })
    }
  }
}
