import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { MermaidAPI } from 'ngx-markdown';
import {
  CnouLegAPIService,
  Note,
  Users,
  Comment,
} from '../cnou-leg-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatorService } from '../translator.service';
import { StaticVariables } from '../static-variables';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarkdownService } from 'ngx-markdown';
import { CommentCardComponent } from '../comment-card/comment-card.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: [
    './note.component.scss',
    '../../../node_modules/keen-slider/keen-slider.min.css',
  ],
})
export class NoteComponent implements OnInit {
  @ViewChild('markdown') markdownElement!: ElementRef<HTMLElement>;
  readonly copyComponent = CopyButtonComponent;
  public noteInfo: Note = {} as Note;
  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Dark,
  };
  public readyCalls = 0;

  public imagesPath: string[] = [];

  public videosPath: string[] = [];

  public documentsPath: string[] = [];

  public comments: Comment[] = [];

  public starsVoted = 0;

  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    public translator: TranslatorService,
    private spinner: NgxSpinnerService
  ) {
    setTimeout(() => {
      this.route.params.subscribe((params) => {
        cnoulegAPIService.getArticleByID(params['id']).subscribe({
          next: (response) => {
            this.noteInfo = response;
            el.nativeElement.setAttribute('tabindex', 0);
            el.nativeElement.focus();
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
            el.nativeElement.addEventListener('keydown', (e: KeyboardEvent) => {
              if (e.key === 'Escape') {
                history.back();
              }
            });
          },
          error: (e) => {
            this.router.navigateByUrl('/noteNotFound');
          },
        });
        cnoulegAPIService.getComments(params['id'], 'note').subscribe({
          next: (response) => {
            response.comments.map((e) => {
              this.comments.push(e);
            });
          },
          error: (e) => {
            console.log(e);
          },
        });
      });
    });
  }
  ngOnInit(): void {}

  openImageSlider(i: number) {
    StaticVariables.lastContent = 'imagesList';
  }

  openVideoSlider(i: number) {
    StaticVariables.lastContent = 'videosList';
  }

  ngAfterViewInit() {
    this.spinner.show();
  }

  load() {
    this.readyCalls++;
    if (this.readyCalls >= 2) {
      this.el.nativeElement.querySelector('.noteElementRoot').style.display =
        'block';
      this.spinner.hide();
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

  comment(e: Event) {
    e.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const finalDate = `${year}-${
      month + 1 < 10 ? '0' + (month + 1) : month + 1
    }-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
    const input = this.el.nativeElement.querySelector(
      '.comment'
    ) as HTMLInputElement;
    const user_id = this.random(4, 5);
    if (input.value.trim().length > 0) {
      this.cnoulegAPIService
        .addComment(
          input.value.trim(),
          user_id,
          this.noteInfo._id,
          null,
          finalDate
        )
        .subscribe((res) => {
          this.el.nativeElement
            .querySelector('.commentsList')
            .insertAdjacentHTML(
              'afterbegin',
              `<app-comment-card [data]="${{
                _id: res.insertedId,
                text: input.value.trim(),
                user_id,
                post_id: this.noteInfo._id,
                parent_id: null,
                date: finalDate,
              }}"></app-comment-card>`
            );
          input.value = '';
        });
    }
  }

  setFilledStars(n?: number) {
    for (let i = 1; i <= 5; i++) {
      (
        this.el.nativeElement.querySelector('.star_' + i) as HTMLElement
      ).className =
        'material-symbols-rounded star_' +
        i +
        (i <= (n ? n : this.starsVoted) ? ' filled' : '');
    }
  }

  setGrade(n: number) {
    this.starsVoted = n;
  }

  random(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
