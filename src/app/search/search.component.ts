import { Component, ElementRef, ViewChild } from '@angular/core';
import { CnouLegAPIService, Note, User, Users } from '../cnou-leg-api.service';
import { TranslatorService } from '../translator.service';
import { StaticVariables } from '../static-variables';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent, FilterDialogData } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @ViewChild("search") searchBar!: ElementRef<HTMLInputElement>;
  public searchBarValue = "";
  public noteInfo: Note[] = [{} as Note];
  public idsLoaded: string[] = [];
  public filters: FilterDialogData = {rating: 0, tags: []};
  constructor(
    private cnoulegAPIService: CnouLegAPIService,
    private el: ElementRef,
    public translator: TranslatorService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    this.loadNotes("", 0, []);
  }

  ngAfterViewInit() {
    this.spinner.show();
  }
  saveElementID(id: string) {
    StaticVariables.elementID = id;
  }
  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {data: {rating: this.filters.rating, tags: this.filters.tags}});
    dialogRef.afterClosed().subscribe((v: FilterDialogData) => {
      if(!v) return;
      this.filters = v;
      this.noteInfo = [];
      this.loadNotes(this.searchBarValue, this.filters.rating, this.filters.tags);
    })
  }

  setSearchValue() {
    this.searchBarValue = this.searchBar.nativeElement.value.trim();
    this.noteInfo = []
    this.loadNotes(this.searchBarValue, this.filters.rating, this.filters.tags);
  }

  loadNotes(text: string, rating: number, tags: string[]) {
    this.cnoulegAPIService.getArticles(text, rating, tags).subscribe((response) => {
      this.noteInfo = response.notes;
      this.noteInfo.map((v) => {
        this.idsLoaded.push(v.author_id);
      });
      this.cnoulegAPIService
        .getUsersById(this.idsLoaded)
        .subscribe((response: Users) => {
          this.noteInfo.map((v) => {
            v.author_name = response.users.find(
              (v2) => v2._id === v.author_id
            )?.username;
          });
          response.users.map((v: User) => {
            const elements = (<HTMLElement>(
              this.el.nativeElement
            )).querySelectorAll('._' + v._id);
            elements.forEach((e) => {
              if(v.profile_pic_url.trim().length > 0) {
                e.setAttribute(
                  'style',
                  `background-image: url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.profile_pic_url})`
                );
              }
            });
          });
          this.el.nativeElement.querySelector('.search-root').style.display =
            'block';
          this.spinner.hide();
          if (StaticVariables.elementID != '') {
            this.el.nativeElement
              .querySelector('._id' + StaticVariables.elementID)
              .scrollIntoView({ block: 'center' });
          }
        });
    });
  }
}
