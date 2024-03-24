import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  constructor(
    private el: ElementRef,
    private router: Router,
    public route: ActivatedRoute,
    private cnoulegAPIService: CnouLegAPIService
  ) {
    this.route.params.subscribe((params) => {
      cnoulegAPIService.getArticleByID(params['id']).subscribe((response) => {
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
          this.imageSlider = new KeenSlider(this.imageSliderRef.nativeElement, {
            initial: this.currentSlide,
            slideChanged: (s) => {
              this.currentSlide = s.track.details.rel;
            },
            created: (s) => {
              s.update();
            },
          });
          addEventListener('keydown', (e: KeyboardEvent) => {
            if (this.router.url.includes('/images') && e.key == 'Escape') {
              if (this.imageSlider) this.closeImageSlider();
            }
            if (this.imageSlider) {
              if (e.key === 'ArrowRight') this.imageSlider?.next();
              if (e.key === 'ArrowLeft') this.imageSlider?.prev();
            }
          });
        });
      });
    });
  }

  updateSlider(len: number, i: number, type: string) {
    if (i === len - 1) {
      if (type === 'image') this.imageSlider?.update();
      this.imageSlider?.moveToIdx(StaticVariables.indexToLoad);
    }
  }

  closeImageSlider() {
    this.router.navigate(['..'], { relativeTo: this.route });
    history.back();
  }
}
