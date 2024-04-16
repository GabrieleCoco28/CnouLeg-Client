import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatorService } from '../translator.service';
import { CnouLegAPIService } from '../cnou-leg-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  @ViewChild('emailRef') emailRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;
  constructor(
    public translator: TranslatorService,
    private cnoulegAPIService: CnouLegAPIService
  ) {}
  login(e: Event) {
    e.preventDefault();
    this.cnoulegAPIService
      .getJWT(
        this.emailRef.nativeElement.value,
        this.passwordRef.nativeElement.value
      )
      .subscribe({
        next: (v) => {
          localStorage.setItem('access_token', v.token);
          localStorage.setItem('user_id', v.user_id);
        },
        error: (err) => {
          console.log(err)
        },
      });
  }
}
