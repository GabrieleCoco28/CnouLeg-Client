import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  { path: '', component: SearchComponent, data: {state: 'search'}},
  { path: 'note/:id', component: NoteComponent, data: {state: 'note'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
