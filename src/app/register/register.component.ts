import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map, merge } from 'rxjs';
import { TranslatorService } from '../translator.service';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  username = new FormControl('', [Validators.required]);
  usernameErrorMessage = '';

  hide = true;
  password = new FormControl('', [Validators.required]);
  passwordErrorMessage = '';

  email = new FormControl('', [Validators.required, Validators.email]);
  emailErrorMessage = '';

  birth = new FormControl('', [Validators.required]);
  birthErrorMessage = '';

  gender = new FormControl('', [Validators.required]);
  genderErrorMessage = '';

  usernameFormGroup = this._formBuilder.group({
    username: this.username,
  });

  emailAndPasswordFormGroup = this._formBuilder.group({
    emailControl: this.email,
    passwordControl: this.password,
  });

  birthAndGenderFormGroup = this._formBuilder.group({
    birth: this.birth,
    gender: this.gender,
  });

  public stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private translator: TranslatorService,
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    merge(this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateUsernameErrorMessage());

    merge(this.birth.statusChanges, this.birth.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateBirthErrorMessage());

    merge(this.gender.statusChanges, this.gender.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateGenderErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  updateUsernameErrorMessage() {
    if (this.password.hasError('required')) {
      this.usernameErrorMessage =
        this.translator.labels.usernameRequired[this.translator.getLanguage()];
    } else {
      this.usernameErrorMessage = '';
    }
  }

  updateBirthErrorMessage() {
    if (this.birth.hasError('required')) {
      this.birthErrorMessage =
        this.translator.labels.birthRequired[this.translator.getLanguage()];
    } else {
      this.birthErrorMessage = '';
    }
  }

  updateGenderErrorMessage() {
    if (this.gender.hasError('required')) {
      this.genderErrorMessage =
        this.translator.labels.genderRequired[this.translator.getLanguage()];
    } else {
      this.genderErrorMessage = '';
    }
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage =
        this.translator.labels.emailRequired[this.translator.getLanguage()];
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage =
        this.translator.labels.invaildEmail[this.translator.getLanguage()];
    } else {
      this.emailErrorMessage = '';
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage =
        this.translator.labels.passwordRequired[this.translator.getLanguage()];
    } else {
      this.passwordErrorMessage = '';
    }
  }
}
