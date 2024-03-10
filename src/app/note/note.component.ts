import { Component } from '@angular/core';
import { CopyButtonComponent } from '../copy-button/copy-button.component'
import { MermaidAPI } from 'ngx-markdown';
import { CnouLegAPIService, Note } from '../cnou-leg-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  readonly copyComponent = CopyButtonComponent;
  public noteInfo: Note = {} as Note;
  public onlyDate = 0;
  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Dark,
  };
  constructor(public cnoulegAPIService: CnouLegAPIService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      cnoulegAPIService.getArticleByID(params['id']).subscribe(response => {
        this.noteInfo = response;
        console.log(response)
      });
    })
  }
}
