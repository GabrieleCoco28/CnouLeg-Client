import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { StaticVariables } from '../static-variables';
import { CnouLegAPIService } from '../cnou-leg-api.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: [
    './image-slider.component.scss',
    '../../../node_modules/keen-slider/keen-slider.min.css',
  ],
})
export class ImageSliderComponent {
  @ViewChild('imageSliderRef') imageSliderRef!: ElementRef<HTMLElement>;
  imageSlider: KeenSliderInstance | null = null;
  currentSlide: number = 0;
  imagesPath: string[] = [];
  imagesCompletePath: string[] = [];
  parameters: any;
  constructor(
    private el: ElementRef,
    private router: Router,
    public route: ActivatedRoute,
    private cnoulegAPIService: CnouLegAPIService
  ) {
    this.route.params.subscribe((params) => {
      this.parameters = params;
      cnoulegAPIService.getArticleByID(params['id']).subscribe({
        next: (response) => {
          response.contents.map((v) => {
            switch (v.type) {
              case 'image':
                this.imagesPath.push(v.path);
                this.imagesCompletePath.push(
                  'https://cochome.ddns.net/content/' +
                    response._id +
                    '/' +
                    v.path
                );
            }
          });
          setTimeout(() => {
            if (!this.imageSliderRef) return;
            this.imageSlider = new KeenSlider(
              this.imageSliderRef.nativeElement,
              {
                initial: this.currentSlide,
                slideChanged: (s) => {
                  this.currentSlide = s.track.details.rel;
                },
                created: (s) => {
                  s.update();
                  this.imageSliderRef.nativeElement.addEventListener(
                    'keydown',
                    (e: KeyboardEvent) => {
                      if (
                        this.router.url.includes('/images') &&
                        e.key == 'Escape'
                      ) {
                        if (this.imageSlider) this.closeImageSlider();
                      }
                      if (this.imageSlider) {
                        if (e.key === 'ArrowRight') this.imageSlider?.next();
                        if (e.key === 'ArrowLeft') this.imageSlider?.prev();
                      }
                    }
                  );
                  this.imageSliderRef.nativeElement.focus();
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

  updateSlider(len: number, i: number) {
    if (i === len - 1) {
      this.imageSlider?.update();
      if (
        this.parameters['index'] &&
        +this.parameters['index'] < this.imagesPath.length
      ) {
        this.imageSlider?.moveToIdx(+this.parameters['index']);
      }
    }
  }

  closeImageSlider() {
    history.back();
  }
}
