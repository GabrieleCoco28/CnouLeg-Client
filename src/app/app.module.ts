import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { provideMarkdown } from 'ngx-markdown';
import { MarkdownModule } from 'ngx-markdown';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { CopyButtonComponent } from './copy-button/copy-button.component';
import { NotesHeaderComponent } from './notes-header/notes-header.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { VideoSliderComponent } from './video-slider/video-slider.component';
import { NoteNotFoundComponent } from './note-not-found/note-not-found.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { RegisterComponent } from './register/register.component';
import { LoginRegisterHeaderComponent } from './login-register-header/login-register-header.component';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import { LoginComponent } from './login/login.component';
import { AccessDialogComponent } from './access-dialog/access-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatOption,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { NgxSpinnerModule } from 'ngx-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Ng2FittextModule } from 'ng2-fittext';
import { NoteComponent } from './note/note.component';
import { SearchComponent } from './search/search.component';
import { TruncateName } from './truncate-name-pipe';
import { NumberSuffixPipe } from './number-suffix-pipe';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from './cnou-leg-api.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { UserComponent } from './user/user.component';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { SnackBarCopiedToClipboardComponent } from './snack-bar-copied-to-clipboard/snack-bar-copied-to-clipboard.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { MarkdownLinkDialogComponent } from './markdown-link-dialog/markdown-link-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CopyButtonComponent,
    NotesHeaderComponent,
    CommentCardComponent,
    NoteComponent,
    SearchComponent,
    ImageSliderComponent,
    VideoSliderComponent,
    NoteNotFoundComponent,
    SearchHeaderComponent,
    RegisterComponent,
    LoginRegisterHeaderComponent,
    SuccessfulRegistrationComponent,
    LoginComponent,
    AccessDialogComponent,
    UserComponent,
    UserNotFoundComponent,
    SnackBarCopiedToClipboardComponent,
    MarkdownEditorComponent,
    MarkdownLinkDialogComponent
  ],
  providers: [
    provideMarkdown(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideNativeDateAdapter(),
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDivider,
    MatCheckbox,
    MatFormFieldModule,
    MatLabel,
    MatOption,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatTooltipModule,
    MatChipsModule,
    MatInputModule,
    MatExpansionModule,
    Ng2FittextModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    TruncateName,
    NumberSuffixPipe,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatMenuModule,
    ImageCropperModule,
    FormsModule 
  ],
})
export class AppModule {}
