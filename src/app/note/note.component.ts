import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
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

  public parameters: any;

  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    public translator: TranslatorService,
    private spinner: NgxSpinnerService,
    private ref: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.route.params.subscribe((params) => {
        this.parameters = params;
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
                this.noteInfo.author_name = response.users[0].username;
                (<HTMLElement>el.nativeElement)
                  .querySelector('.user-subtitle-avatar')
                  ?.setAttribute(
                    'style',
                    `background-image: url(${cnoulegAPIService.apiUrl}/profile_pics/${response.users[0].profile_pic_url})`
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
        this.cnoulegAPIService
          .getComments(this.parameters['id'], 'note')
          .subscribe({
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
    const input = this.el.nativeElement.querySelector(
      '.comment'
    ) as HTMLInputElement;
    if (input.value.trim().length > 0) {
      this.cnoulegAPIService
        .addComment(
          input.value.trim(),
          this.noteInfo.author_id, //todo replace with actual user id
          this.noteInfo._id,
          null
        )
        .subscribe((res) => {
          this.comments.unshift({
            _id: res.insertedId,
            text: input.value.trim(),
            user_id: this.noteInfo.author_id, //todo replace with actual user id
            post_id: this.noteInfo._id,
            parent_id: null,
            likes: 0,
            date: res.uploadDate,
            has_children: false,
          });
          input.value = '';
          this.ref.detectChanges();
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
