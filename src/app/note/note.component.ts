import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { MermaidAPI } from 'ngx-markdown';
import { CnouLegAPIService, Note, Users } from '../cnou-leg-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss', "../../../node_modules/keen-slider/keen-slider.min.css",],
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
  public documentsPath: string[] = [];

  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  currentSlide: number = 0;
  dotHelper: Array<Number> = [];
  slider: KeenSliderInstance|null = null;

  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
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
      window.scrollTo(0, 0);
    });
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel;
        },
      });
      this.dotHelper = [
        ...Array(this.slider?.track.details.slides.length).keys(),
      ];
    });
  }
  
  updateSlider(len: number, i: number) {
    if(i === len - 1) {
      this.slider?.update();
    }
  }

  closeSlider() {
    this.el.nativeElement.querySelector(".noteElementRoot").style.display = "block";
    this.el.nativeElement.querySelector(".sliderElementRoot").style.display = "none";
  }

  openSlider(i: number) {
    this.el.nativeElement.querySelector(".noteElementRoot").style.display = "none";
    this.el.nativeElement.querySelector(".sliderElementRoot").style.display = "block";
    this.slider?.update();
    this.slider?.moveToIdx(i);
  }
}
