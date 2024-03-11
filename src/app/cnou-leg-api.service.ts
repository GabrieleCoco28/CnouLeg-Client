import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Note {
  _id: string,
  title: string, 
  author_id: string,
  subject: string,
  class: string,
  tags: Array<string>,
  description: string,
  data_upload: string,
  data_last_modified: string,
  avg_rating: number,
  no_of_ratings: number,
  markdown: string,
  contents: []
}

export interface Notes {
  notes: Array<Note>
}

@Injectable({
  providedIn: 'root'
})
export class CnouLegAPIService {
  constructor(private http: HttpClient) {}

  public getArticles(): Observable<any> {
    const url = 'https://cochome.ddns.net/api/notes';
    return this.http.get<Notes>(url);
  }

  public getArticleByID(id: string) {
    const url = 'https://cochome.ddns.net/api/notes?id=' + id;
    return this.http.get<Note>(url);
  }
}
