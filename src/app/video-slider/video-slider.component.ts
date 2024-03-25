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
  parameters: any;
  constructor(
    public cnoulegAPIService: CnouLegAPIService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) {
    this.route.params.subscribe((params) => {
      this.parameters = params;
      cnoulegAPIService.getArticleByID(params['id']).subscribe({
        next: (response) => {
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
            if (!this.videoSliderRef) return;
            this.videoSlider = new KeenSlider(
              this.videoSliderRef.nativeElement,
              {
                initial: this.currentSlide,
                slideChanged: (s) => {
                  this.currentSlide = s.track.details.rel;
                  this.pauseAllVideos();
                  (s.slides[this.currentSlide] as HTMLVideoElement).play();
                },
                created: (s) => {
                  s.update();
                  this.videoSliderRef.nativeElement.addEventListener(
                    'keydown',
                    (e: KeyboardEvent) => {
                      if (
                        this.router.url.includes('/videos') &&
                        e.key == 'Escape'
                      ) {
                        let canClose = false;
                        const videoElements: HTMLVideoElement[] =
                          this.el.nativeElement.querySelectorAll(
                            '.video-slide'
                          );
                        videoElements.forEach((v) => {
                          canClose = canClose
                            ? true
                            : v.currentTime > 0.1 && v.readyState > 2;
                        });
                        if (canClose) this.closeVideoSlider();
                      }
                      if (
                        this.router.url.includes('/videos') &&
                        this.videoSlider
                      ) {
                        if (e.key === 'ArrowRight') this.videoSlider?.next();
                        if (e.key === 'ArrowLeft') this.videoSlider?.prev();
                      }
                    }
                  );
                  if (
                    this.parameters['index'] &&
                    +this.parameters['index'] < this.videosPath.length &&
                    !isNaN(parseFloat(this.parameters['index']))
                  ) {
                    this.el.nativeElement
                      .querySelector('.video-slide' + this.parameters['index'])
                      .focus();
                  }
                },
                defaultAnimation: {
                  duration: 0,
                },
              }
            );
          });
        },
        error: (e) => {
          this.router.navigateByUrl('/noteNotFound');
        },
      });
    });
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  updateSlider(len: number, i: number) {
    if (i === len - 1) {
      this.videoSlider?.update();
      if (
        this.parameters['index'] &&
        +this.parameters['index'] < this.videosPath.length &&
        !isNaN(parseFloat(this.parameters['index']))
      ) {
        this.videoSlider?.moveToIdx(+this.parameters['index']);
        this.pauseAllVideos();
        this.el.nativeElement
          .querySelector('.video-slide' + this.parameters['index'])
          .play();
      }
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
  }
}
