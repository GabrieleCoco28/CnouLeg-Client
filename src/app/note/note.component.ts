import { Component, ElementRef, OnInit } from '@angular/core';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { MermaidAPI } from 'ngx-markdown';
import { CnouLegAPIService, Note, Users } from '../cnou-leg-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent implements OnInit {
  readonly copyComponent = CopyButtonComponent;
  public noteInfo: Note = {} as Note;
  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Dark,
  };

  public items = new Array(10).fill("https://picsum.photos/1280/720", 0, 10);
  public itemsVideo = new Array(5).fill("https://www.shutterstock.com/shutterstock/videos/1091801169/preview/stock-footage-interior-design-studio-designers-with-architects-and-clients-select-solutions-and-combinations-of.webm#t=1", 0, 5);

  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) {
    this.route.params.subscribe((params) => {
      cnoulegAPIService.getArticleByID(params['id']).subscribe((response) => {
        this.noteInfo = response;
        cnoulegAPIService.getUsersById([this.noteInfo.author_id]).subscribe((response: Users) => {
          this.noteInfo.author_name = response.users[0].name;
          (<HTMLElement>el.nativeElement).querySelector(".user-subtitle-avatar")?.setAttribute("style", `background-image: url(https://cochome.ddns.net/profile_pics/${response.users[0].profile_pic_url})`);
        })
      });
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
