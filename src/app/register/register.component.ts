import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map, merge } from 'rxjs';
import { TranslatorService } from '../translator.service';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CnouLegAPIService, RegistrationData } from '../cnou-leg-api.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  @ViewChild('usernameRef') usernameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('birthRef') birthRef!: ElementRef<HTMLInputElement>;
  public genderValue = "";
  @ViewChild('emailRef') emailRef!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordRef') passwordRef!: ElementRef<HTMLInputElement>;
  public roleValue = "";
  @ViewChild('schoolRef') schoolRef!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionRef') descriptionRef!: ElementRef<HTMLInputElement>;

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
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private cnoulegAPIService: CnouLegAPIService
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

  sendRegistrationData() {
    const data: RegistrationData = {
      username: this.usernameRef.nativeElement.value,
      birth: this.birthRef.nativeElement.value,
      gender: this.genderValue,
      email: this.emailRef.nativeElement.value,
      password: this.passwordRef.nativeElement.value,
      role: this.roleValue,
      school: this.schoolRef.nativeElement.value,
      description: this.descriptionRef.nativeElement.value,
      profile_pic_url: ""
    };
    this.cnoulegAPIService.sendRegistrationData(data).subscribe(() => {
      this.router.navigateByUrl('/registrationDone');
    });
  }

  setGender(gender: string) {
    this.genderValue = gender;
  }

  setRole(role: string) {
    this.roleValue = role;
  }
}
