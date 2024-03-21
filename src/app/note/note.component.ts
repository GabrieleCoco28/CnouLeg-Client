import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { MermaidAPI } from 'ngx-markdown';
import { CnouLegAPIService, Note, Users } from '../cnou-leg-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { TranslatorService } from '../translator.service';

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
  public imagesCompletePath: string[] = [];

  public videosPath: string[] = [];
  public videosCompletePath: string[] = [];

  public documentsPath: string[] = [];

  @ViewChild('imageSliderRef') imageSliderRef!: ElementRef<HTMLElement>;
  @ViewChild('videoSliderRef') videoSliderRef!: ElementRef<HTMLElement>;

  isImageSliderOpened = false;
  isVideoSliderOpened = false;

  currentSlide: number = 0;
  imageSlider: KeenSliderInstance | null = null;
  videoSlider: KeenSliderInstance | null = null;

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
              this.imagesCompletePath.push(
                'https://cochome.ddns.net/content/' +
                  this.noteInfo._id +
                  '/' +
                  v.path
              );
              break;
            case 'video':
              this.videosPath.push(v.path);
              this.videosCompletePath.push(
                'https://cochome.ddns.net/content/' +
                  this.noteInfo._id +
                  '/' +
                  v.path
              );
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
      window.scrollTo(0, 0);
    });
    addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.router.url.includes('/note') && e.key == 'Escape') {
        this.closeImageSlider();
        this.closeVideoSlider();
      }
      if (this.isImageSliderOpened) {
        if (e.key === 'ArrowRight') this.imageSlider?.next();
        if (e.key === 'ArrowLeft') this.imageSlider?.prev();
      }
      if (this.isVideoSliderOpened) {
        if (e.key === 'ArrowRight') this.videoSlider?.next();
        if (e.key === 'ArrowLeft') this.videoSlider?.prev();
      }
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

  ngAfterViewInit() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      if (this.imagesPath.length > 0) {
        this.imageSlider = new KeenSlider(this.imageSliderRef.nativeElement, {
          initial: this.currentSlide,
          slideChanged: (s) => {
            this.currentSlide = s.track.details.rel;
          },
        });
      }

      if (this.videosPath.length > 0) {
        this.videoSlider = new KeenSlider(this.videoSliderRef.nativeElement, {
          initial: this.currentSlide,
          slideChanged: (s) => {
            this.currentSlide = s.track.details.rel;
            this.pauseAllVideos();
          },
        });
      }
    });
  }

  updateSlider(len: number, i: number) {
    if (i === len - 1) {
      this.imageSlider?.update();
      this.videoSlider?.update();
    }
  }

  closeImageSlider() {
    this.el.nativeElement.querySelector('.noteElementRoot').style.display =
      'block';
    this.el.nativeElement.querySelector(
      '.imageSliderElementRoot'
    ).style.display = 'none';
    this.isImageSliderOpened = false;
  }

  closeVideoSlider() {
    this.el.nativeElement.querySelector('.noteElementRoot').style.display =
      'block';
    this.el.nativeElement.querySelector(
      '.videoSliderElementRoot'
    ).style.display = 'none';
    this.pauseAllVideos();
    this.isVideoSliderOpened = false;
  }

  openImageSlider(i: number) {
    this.updateSlider(0, 1);
    this.el.nativeElement.querySelector('.noteElementRoot').style.display =
      'none';
    this.el.nativeElement.querySelector(
      '.imageSliderElementRoot'
    ).style.display = 'block';
    this.imageSlider?.update();
    this.imageSlider?.moveToIdx(i);
    this.isImageSliderOpened = true;
  }

  openVideoSlider(i: number) {
    this.updateSlider(0, 1);
    this.el.nativeElement.querySelector('.noteElementRoot').style.display =
      'none';
    this.el.nativeElement.querySelector(
      '.videoSliderElementRoot'
    ).style.display = 'block';
    this.videoSlider?.update();
    this.videoSlider?.moveToIdx(i);
    this.isVideoSliderOpened = true;
  }

  pauseAllVideos() {
    const videoElements: HTMLVideoElement[] =
      this.el.nativeElement.querySelectorAll('.video-slide');
    videoElements.forEach((v) => {
      v.pause();
    });
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
}
