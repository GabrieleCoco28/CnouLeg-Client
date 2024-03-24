import { Component, ElementRef, ViewChild } from '@angular/core';
import { StaticVariables } from '../static-variables';
import { ActivatedRoute, Router } from '@angular/router';
import { CnouLegAPIService, Users } from '../cnou-leg-api.service';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: [
    './video-slider.component.scss',
    '../../../node_modules/keen-slider/keen-slider.min.css',
  ],
})
export class VideoSliderComponent {
  public videosPath: string[] = [];
  public videosCompletePath: string[] = [];
  @ViewChild('videoSliderRef') videoSliderRef!: ElementRef<HTMLElement>;
  currentSlide: number = 0;
  videoSlider: KeenSliderInstance | null = null;
  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) {
    this.route.params.subscribe((params) => {
      cnoulegAPIService.getArticleByID(params['id']).subscribe((response) => {
        response.contents.map((v) => {
          switch (v.type) {
            case 'video':
              this.videosPath.push(v.path);
              this.videosCompletePath.push(
                'https://cochome.ddns.net/content/' +
                  response._id +
                  '/' +
                  v.path
              );
              break;
          }
        });
        setTimeout(() => {
          this.videoSlider = new KeenSlider(this.videoSliderRef.nativeElement, {
            initial: this.currentSlide,
            slideChanged: (s) => {
              this.currentSlide = s.track.details.rel;
              this.pauseAllVideos();
              (s.slides[this.currentSlide] as HTMLVideoElement).play();
            },
            created: (s) => {
              s.update();
            },
            defaultAnimation: {
              duration: 0
            }
          });
        });
      });
    });
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  ngAfterViewInit() {
    addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.router.url.includes('/videos') && e.key == 'Escape') {
        if (this.videoSlider) {
          const videoElements: HTMLVideoElement[] =
            this.el.nativeElement.querySelectorAll('.video-slide');
          videoElements.forEach((v) => {
            if (v.currentTime > 0.1 && v.readyState > 2) {
              this.videoSliderRef.nativeElement.remove();
              this.closeVideoSlider();
            }
          });
        }
      }
      if (this.router.url.includes('/videos') && this.videoSlider) {
        if (e.key === 'ArrowRight') this.videoSlider?.next();
        if (e.key === 'ArrowLeft') this.videoSlider?.prev();
      }
    });
  }

  updateSlider(len: number, i: number, type: string) {
    if (i === len - 1) {
      this.videoSlider?.update();
      this.videoSlider?.moveToIdx(StaticVariables.indexToLoad);
      this.pauseAllVideos();
      this.el.nativeElement
        .querySelector('.video-slide' + StaticVariables.indexToLoad)
        .play();
    }
  }

  pauseAllVideos() {
    const videoElements: HTMLVideoElement[] =
      this.el.nativeElement.querySelectorAll('.video-slide');
    videoElements.forEach((v) => {
      v.pause();
    });
  }

  closeVideoSlider() {
    this.pauseAllVideos();
    history.back();
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
