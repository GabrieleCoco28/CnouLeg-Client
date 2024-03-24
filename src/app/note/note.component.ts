import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { MermaidAPI } from 'ngx-markdown';
import { CnouLegAPIService, Note, Users } from '../cnou-leg-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslatorService } from '../translator.service';
import { StaticVariables } from '../static-variables';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: [
    './note.component.scss',
    '../../../node_modules/keen-slider/keen-slider.min.css',
  ],
})
export class NoteComponent implements OnInit {
  readonly copyComponent = CopyButtonComponent;
  public noteInfo: Note = {} as Note;
  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Dark,
  };

  public imagesPath: string[] = [];

  public videosPath: string[] = [];

  public documentsPath: string[] = [];

  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private translator: TranslatorService
  ) {
    this.route.params.subscribe((params) => {
      cnoulegAPIService.getArticleByID(params['id']).subscribe((response) => {
        this.noteInfo = response;
        this.noteInfo.contents.map((v) => {
          switch (v.type) {
            case 'image':
              this.imagesPath.push(v.path);
              break;
            case 'video':
              this.videosPath.push(v.path);
              break;
            case 'document':
              this.documentsPath.push(v.path);
              break;
          }
        });
        cnoulegAPIService
          .getUsersById([this.noteInfo.author_id])
          .subscribe((response: Users) => {
            this.noteInfo.author_name = response.users[0].name;
            (<HTMLElement>el.nativeElement)
              .querySelector('.user-subtitle-avatar')
              ?.setAttribute(
                'style',
                `background-image: url(https://cochome.ddns.net/profile_pics/${response.users[0].profile_pic_url})`
              );
          });
      });
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }

  ngAfterViewInit() {
    if (this.imagesPath.length <= 0) {
      this.load(1, 0);
    }
  }

  openImageSlider(i: number) {
    StaticVariables.indexToLoad = i;
    StaticVariables.lastContent = 'imagesList';
  }

  openVideoSlider(i: number) {
    StaticVariables.indexToLoad = i;
    StaticVariables.lastContent = 'videosList';
  }

  translateSubject(sub: string) {
    return this.translator.translateSubject(sub);
  }

  translateSchool(school: string) {
    return this.translator.translateSchool(school);
  }

  getSubjectIcon(sub: string) {
    return this.translator.getSubjectIcon(sub);
  }

  load(len: number, i: number) {
    if (i === len - 1) {
      this.el.nativeElement.querySelector('.noteElementRoot').style.display =
        'block';
      this.el.nativeElement.querySelector('.spinner').style.display = 'none';
      if (
        StaticVariables.lastContent != '' &&
        this.el.nativeElement.querySelector('.' + StaticVariables.lastContent)
      ) {
        this.el.nativeElement
          .querySelector('.' + StaticVariables.lastContent)
          .scrollIntoView({ block: 'center' });
        StaticVariables.lastContent = '';
      } else {
        window.scrollTo(0, 0);
      }
    }
  }
}
