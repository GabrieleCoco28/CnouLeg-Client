import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CnouLegAPIService, Note, User, Users } from '../cnou-leg-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent{
  public noteInfo: Note[] = [{} as Note];
  public idsLoaded: number[] = [];
  constructor(private cnoulegAPIService: CnouLegAPIService, private el: ElementRef ) {
    cnoulegAPIService.getArticles().subscribe(response => {
      this.noteInfo = response.notes;
      this.noteInfo.map((v) => {
        this.idsLoaded.push(v.author_id);
      });
      cnoulegAPIService.getUsersById(this.idsLoaded).subscribe((response: Users) => {
        this.noteInfo.map((v) => {
          v.author_name = response.users.find((v2) => v2.id === v.author_id)?.name;
        });
        response.users.map((v: User) => {
          const elements = (<HTMLElement>this.el.nativeElement).querySelectorAll('._' + v.id);
          elements.forEach((e) => {
            e.setAttribute("style", `background-image: url(https://cochome.ddns.net/profile_pics/${v.profile_pic_url})`);
          })
        })
      })
    });
  }
}
