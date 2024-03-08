import { Component } from '@angular/core';
import { CopyButtonComponent } from '../copy-button/copy-button.component'
import { MermaidAPI } from 'ngx-markdown';
import { CnouLegAPIService, Note } from '../cnou-leg-api.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  readonly copyComponent = CopyButtonComponent;
  public noteInfo: Note = {} as Note;
  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Dark,
  };
  constructor(public cnoulegAPIService: CnouLegAPIService) {
    cnoulegAPIService.getArticles().subscribe(response => {
      this.noteInfo = response[0];
    })
  }
}
