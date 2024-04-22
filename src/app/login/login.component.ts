import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslatorService } from '../translator.service';
import { CnouLegAPIService } from '../cnou-leg-api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('emailRef') emailRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;

  hide = true;
  password = new FormControl('', [Validators.required]);
  passwordErrorMessage = '';

  email = new FormControl('', [Validators.required, Validators.email]);
  emailErrorMessage = '';

  emailAndPasswordFormGroup = this._formBuilder.group({
    emailControl: this.email,
    passwordControl: this.password,
  });

  constructor(
    public translator: TranslatorService,
    private cnoulegAPIService: CnouLegAPIService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  login(e: Event) {
    if(this.passwordRef.nativeElement.value.trim().length <= 0 || this.emailRef.nativeElement.value.trim().length <= 0) return;
    this.cnoulegAPIService
      .getJWT(
        this.emailRef.nativeElement.value,
        this.passwordRef.nativeElement.value
      )
      .subscribe({
        next: (v) => {
          localStorage.setItem('access_token', v.token);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          if (
            err.status === 404 &&
            this.emailRef.nativeElement.value.trim().length > 0
          )
            this.email.setErrors({ doesntExist: true });
          else {
            this.email.setErrors({ doesntExist: null });
            this.email.updateValueAndValidity();
          }

          if (
            err.status === 401 &&
            this.passwordRef.nativeElement.value.trim().length > 0
          )
            this.password.setErrors({ doesntExist: true });
          else {
            this.password.setErrors({ doesntExist: null });
            this.password.updateValueAndValidity();
          }

          this.updateEmailErrorMessage();
          this.updatePasswordErrorMessage();
        },
      });
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage =
        this.translator.labels.emailRequired[this.translator.getLanguage()];
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage =
        this.translator.labels.invaildEmail[this.translator.getLanguage()];
    } else if (this.email.hasError('doesntExist')) {
      this.emailErrorMessage = this.translator.labels.emailDoesntExist[this.translator.getLanguage()];
    } else {
      this.emailErrorMessage = '';
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage =
        this.translator.labels.passwordRequired[this.translator.getLanguage()];
    } else if (this.password.hasError('doesntExist')) {
      this.passwordErrorMessage = this.translator.labels.wrongPassword[this.translator.getLanguage()];
    } else {
      this.passwordErrorMessage = '';
    }
  }
}
