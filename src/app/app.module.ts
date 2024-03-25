import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { provideMarkdown } from 'ngx-markdown';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { CopyButtonComponent } from './copy-button/copy-button.component';
import { NotesHeaderComponent } from './notes-header/notes-header.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { VideoSliderComponent } from './video-slider/video-slider.component';
import { NoteNotFoundComponent } from './note-not-found/note-not-found.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { Ng2FittextModule } from 'ng2-fittext';
import { NoteComponent } from './note/note.component';
import { SearchComponent } from './search/search.component';

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
    NoteNotFoundComponent
  ],
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
    MatTooltipModule,
    MatChipsModule,
    MatInputModule,
    MatExpansionModule,
    Ng2FittextModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    MatProgressSpinnerModule
  ],
  providers: [provideMarkdown(), provideAnimationsAsync(), provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
