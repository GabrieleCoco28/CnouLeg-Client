import { Component } from '@angular/core';
import { CnouLegAPIService, Note } from '../cnou-leg-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public noteInfo: Note[] = [{} as Note];
  constructor(private cnoulegAPIService: CnouLegAPIService) {
    cnoulegAPIService.getArticles().subscribe(response => {
      this.noteInfo = response.notes;
    });
  }
}
