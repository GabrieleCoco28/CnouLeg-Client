import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { NoteComponent } from './note/note.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { VideoSliderComponent } from './video-slider/video-slider.component';

const routes: Routes = [
  { path: '', component: SearchComponent, data: {state: 'search'}},
  { path: 'note', children: [
    {
      path: ":id",
      component: NoteComponent
    },
    {
      path: ":id/images",
      component: ImageSliderComponent
    },
    {
      path: ":id/videos",
      component: VideoSliderComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
