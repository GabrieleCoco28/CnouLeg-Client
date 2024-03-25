import { Component, ElementRef } from '@angular/core';
import { CnouLegAPIService, Note, User, Users } from '../cnou-leg-api.service';
import { TranslatorService } from '../translator.service';
import { StaticVariables } from '../static-variables';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public noteInfo: Note[] = [{} as Note];
  public idsLoaded: number[] = [];
  constructor(
    private cnoulegAPIService: CnouLegAPIService,
    private el: ElementRef,
    private translator: TranslatorService,
    private spinner: NgxSpinnerService
  ) {
    cnoulegAPIService.getArticles().subscribe((response) => {
      this.noteInfo = response.notes;
      this.noteInfo.map((v) => {
        this.idsLoaded.push(v.author_id);
      });
      cnoulegAPIService
        .getUsersById(this.idsLoaded)
        .subscribe((response: Users) => {
          this.noteInfo.map((v) => {
            v.author_name = response.users.find(
              (v2) => v2.id === v.author_id
            )?.name;
          });
          response.users.map((v: User) => {
            const elements = (<HTMLElement>(
              this.el.nativeElement
            )).querySelectorAll('._' + v.id);
            elements.forEach((e) => {
              e.setAttribute(
                'style',
                `background-image: url(https://cochome.ddns.net/profile_pics/${v.profile_pic_url})`
              );
            });
          });
          // this.spinner.hide();
          el.nativeElement.querySelector('.search-root').style.display =
            'block';
          this.spinner.hide();
          if (StaticVariables.elementID != '') {
            el.nativeElement
              .querySelector('._id' + StaticVariables.elementID)
              .scrollIntoView({ block: 'center' });
          }
        });
    });
  }

  ngAfterViewInit() {
    this.spinner.show();
  }

  translateSubject(sub: string) {
    return this.translator.translateSubject(sub);
  }
  translateSchool(school: string) {
    return this.translator.translateSchool(school);
  }
  saveElementID(id: string) {
    StaticVariables.elementID = id;
  }
}
