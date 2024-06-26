import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { NoteComponent } from './note/note.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { VideoSliderComponent } from './video-slider/video-slider.component';
import { NoteNotFoundComponent } from './note-not-found/note-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SuccessfulRegistrationComponent } from './successful-registration/successful-registration.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';

const routes: Routes = [
  { path: '', component: SearchComponent, data: { state: 'search' } },
  {
    path: 'note',
    children: [
      {
        path: ':id',
        component: NoteComponent,
      },
      {
        path: '',
        redirectTo: '/noteNotFound',
        pathMatch: 'full',
      },
      {
        path: ':id/images',
        component: ImageSliderComponent,
      },
      {
        path: ':id/videos',
        component: VideoSliderComponent,
      },
      {
        path: ':id/images/:index',
        component: ImageSliderComponent,
      },
      {
        path: ':id/videos/:index',
        component: VideoSliderComponent,
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        redirectTo: '/userNotFound',
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: UserComponent,
      },
    ],
  },
  {
    path: 'editor',
    children: [
      {
        path: '',
        component: MarkdownEditorComponent
      },
      {
        path: ':id',
        component: MarkdownEditorComponent,
      },
    ],
  },
  { path: 'registrationDone', component: SuccessfulRegistrationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'noteNotFound', component: NoteNotFoundComponent },
  { path: 'userNotFound', component: UserNotFoundComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
