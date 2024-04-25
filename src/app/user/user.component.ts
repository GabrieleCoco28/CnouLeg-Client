import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CnouLegAPIService, User } from '../cnou-leg-api.service';
import { TranslatorService } from '../translator.service';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarCopiedToClipboardComponent } from '../snack-bar-copied-to-clipboard/snack-bar-copied-to-clipboard.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @ViewChild('usernameRef') usernameRef!: ElementRef<HTMLInputElement>;
  @ViewChild('birthRef') birthRef!: ElementRef<HTMLInputElement>;
  @ViewChild('schoolRef') schoolRef!: ElementRef<HTMLInputElement>;
  @ViewChild('subjectRef') subjectRef!: ElementRef<HTMLInputElement>;
  @ViewChild('bioRef') bioRef!: ElementRef<HTMLInputElement>;
  @ViewChild('themeIcon', { read: ElementRef })
  themeIcon!: ElementRef<HTMLElement>;
  public roleValue = '';

  public parameters: any;
  public userInfo?: User;
  public isCurrentUser = false;
  public isEditMode = false;
  public currentAvatarUrl = '../../assets/default.svg';
  public lastSavedAvatarUrl = '../../assets/default.svg';
  public defaultAvatarUrl = '../../assets/default.svg';

  // Cropper params
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedImageBlob: Blob = new Blob();
  canvasRotation = 0;
  rotation?: number;
  aspectRatio = 1 / 1;
  showCropper = false;
  transform: ImageTransform = {
    translateUnit: 'px',
  };
  imageURL?: string;
  loading = false;
  allowMoveImage = false;
  croppedSaved = false;

  constructor(
    public route: ActivatedRoute,
    public cnoulegAPIService: CnouLegAPIService,
    private el: ElementRef,
    private router: Router,
    public translator: TranslatorService,
    private sanitizer: DomSanitizer,
    public spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {
    setTimeout(() => {
      this.route.params.subscribe((params) => {
        this.parameters = params;
        this.cnoulegAPIService.getUsersById([params['id']]).subscribe({
          next: (response) => {
            this.userInfo = response.users[0];
            this.isCurrentUser =
              cnoulegAPIService.getUserIdFromJWT() === params['id'];
            if (response.users.length <= 0) {
              router.navigateByUrl('/userNotFound');
              return;
            }
            if (this.userInfo.profile_pic_url.trim().length > 0)
              this.currentAvatarUrl =
                cnoulegAPIService.apiUrl +
                '/profile_pics/' +
                this.userInfo.profile_pic_url;

            this.roleValue = this.userInfo.role;
            this.lastSavedAvatarUrl = this.currentAvatarUrl;
          },
          error: () => {
            router.navigateByUrl('/userNotFound');
          },
        });
      });
    });
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

  toggleEdit() {
    if (this.isCurrentUser) {
      this.isEditMode = !this.isEditMode;
    }
  }

  setRole(role: string) {
    this.roleValue = role;
  }

  fileChangeEvent(event: any): void {
    this.loading = true;
    this.spinner.show();
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl || event.base64 || ''
    );
    this.croppedImageBlob = event.blob as Blob;
  }

  imageLoaded() {
    this.showCropper = true;
    this.croppedSaved = false;
    this.spinner.hide();
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    this.loading = false;
  }

  loadImageFailed() {
    console.error('Load image failed');
  }

  rotateLeft() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation--;
    });
  }

  rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
    });
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  uploadImage() {
    this.croppedSaved = true;
    this.currentAvatarUrl = this.croppedImage;
    this.showCropper = !this.showCropper;
  }

  applyChanges() {
    if (this.usernameRef.nativeElement.value.trim().length <= 0) return;
    this.userInfo!.username = this.usernameRef.nativeElement.value;
    this.userInfo!.bio = this.bioRef.nativeElement.value;
    this.userInfo!.birthdate = this.birthRef.nativeElement.value;
    this.userInfo!.subject = this.subjectRef.nativeElement.value;
    this.userInfo!.school = this.schoolRef.nativeElement.value;
    this.userInfo!.role =
      this.roleValue.trim().length <= 0 ? this.userInfo!.role : this.roleValue;
    this.lastSavedAvatarUrl = this.currentAvatarUrl;
    this.cnoulegAPIService
      .updateUser(
        this.lastSavedAvatarUrl !== this.defaultAvatarUrl &&
          this.croppedImage
          ? this.croppedImageBlob
          : null,
        this.userInfo!.username,
        this.userInfo!.bio,
        this.userInfo!.birthdate,
        this.userInfo!.role,
        this.userInfo!.school,
        this.userInfo!.subject,
        this.currentAvatarUrl === this.defaultAvatarUrl
      )
      .subscribe((v) => {
        console.log(v);
      });
    this.toggleEdit();
  }

  revertChanges() {
    this.currentAvatarUrl = this.lastSavedAvatarUrl;
    this.croppedSaved = false;
    this.toggleEdit();
  }

  back() {
    history.back();
  }

  copyUrlToClipboard() {
    navigator.clipboard.writeText(document.location.href);
    this.snackBar.openFromComponent(SnackBarCopiedToClipboardComponent, {
      duration: 2000,
    });
  }
}
