import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Note {
  _id: string,
  title: string, 
  author_id: number,
  subject: string,
  class: string,
  tags: Array<string>,
  description: string,
  data_upload: string,
  data_last_modified: string,
  avg_rating: number,
  no_of_ratings: number,
  markdown: string,
  contents: Array<Content>,
  author_name?: string
}

export interface Comment {
  _id: string,
  text: string,
  user_id: number,
  post_id: string | null,
  parent_id: string | null,
  likes: number,
  date: string,
  author_name?: string
}

export interface Content {
  type: string,
  path: string
}

export interface Notes {
  notes: Array<Note>
}

export interface Comments {
  comments: Array<Comment>
}

export interface User {
  id: number,
  name: string,
  profile_pic_url: string
}

export interface Users {
  users: Array<User>
}

type RefersTo = 'note' | 'comment';

@Injectable({
  providedIn: 'root'
})
export class CnouLegAPIService {
  constructor(private http: HttpClient) {}

  public getArticles(): Observable<Notes> {
    const url = 'https://cochome.ddns.net/api/notes';
    return this.http.get<Notes>(url);
  }

  public getArticleByID(id: string) {
    const url = 'https://cochome.ddns.net/api/notes?id=' + id;
    return this.http.get<Note>(url);
  }

  public getUsers(): Observable<Users> {
    const url = "https://cochome.ddns.net/api/users";
    return this.http.get<Users>(url);
  }

  public getUsersById(ids: number[]): Observable<Users> {
    let url = "https://cochome.ddns.net/api/users?";
    ids.map((v) => {
      url += "include_id[]=" + v + "&";
    })
    return this.http.get<Users>(url);
  }

  public getComments(id: string, refersTo: RefersTo): Observable<Comments> {
    const url = "https://cochome.ddns.net/api/comments?" + (refersTo === 'comment' ? "parent_id=" : (refersTo === 'note' ? "post_id=" : "")) + id;
    return this.http.get<Comments>(url);
  }
}
