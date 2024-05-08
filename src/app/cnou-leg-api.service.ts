import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  contents: Array<Content>,
  author_name?: string
}

export interface Notes {
  notes: Array<Note>
}

export interface Comment {
  _id: string,
  text: string,
  user_id: string,
  post_id: string | null,
  parent_id: string | null,
  likes: number,
  date: string,
  has_children: boolean,
  user_like?: number
  author_name?: string,
}

export interface Comments {
  comments: Array<Comment>
}

export interface Content {
  type: string,
  path: string
}

export interface User {
  _id: string,
  username: string,
  birthdate: string,
  gender: string,
  role: string,
  school: string,
  bio: string,
  subject: string,
  profile_pic_url: string
}

export interface Users {
  users: Array<User>
}

export interface RegistrationData {
  username: string,
  birthdate: string,
  gender: string,
  email: string,
  password: string,
  role: string,
  school: string,
  bio: string,
  subject: string
}

export interface Rating {
  _id: string,
  note_id: string,
  user_id: string,
  rating: number
}

export interface JWT {
  token: string
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

type RefersTo = 'note' | 'comment';

@Injectable({
  providedIn: 'root'
})
export class CnouLegAPIService {
  public apiUrl = 'https://cochome.ddns.net';
  constructor(private http: HttpClient) {}

  public getArticles(text: string, rating: number): Observable<Notes> {
    const url = this.apiUrl + '/api/notes?text=' + text + "&rating=" + rating;
    return this.http.get<Notes>(url);
  }

  public getArticleByID(id: string) {
    const url = this.apiUrl + '/api/notes?id=' + id;
    return this.http.get<Note>(url);
  }

  public getArticlesByUserId(id: string) {
    const url = this.apiUrl + '/api/notes?user_id=' + id;
    return this.http.get<Notes>(url);
  }

  public getUsers(): Observable<Users> {
    const url = this.apiUrl + "/api/users";
    return this.http.get<Users>(url);
  }

  public getUsersById(ids: string[]): Observable<Users> {
    let url = this.apiUrl + "/api/users?";
    ids.map((v) => {
      url += "include_id[]=" + v + "&";
    })
    return this.http.get<Users>(url);
  }

  public getComments(id: string, refersTo: RefersTo): Observable<Comments> {
    const url = this.apiUrl + "/api/comments?" + (refersTo === 'comment' ? "parent_id=" : (refersTo === 'note' ? "post_id=" : "")) + id;
    return this.http.get<Comments>(url);
  }

  public addComment(text: string, post_id: string | null, parent_id: string | null): Observable<any> {
    return this.http.post(this.apiUrl + "/api/comments", {text, post_id, parent_id});
  }

  public sendRegistrationData(data: RegistrationData): Observable<any> {
    return this.http.post(this.apiUrl + "/api/user", data);
  }

  public validateEmail(email: string): Observable<any> {
    const url = this.apiUrl + "/api/validate_email?email=" + email;
    return this.http.get<Comments>(url);
  }

  public getJWT(email: string, password: string) {
    const url = this.apiUrl + "/api/login";
    return this.http.post<JWT>(url, {email, password});
  }

  public getUserByJwt() {
    const claims = atob(localStorage.getItem('access_token')!.split('.')[1])
    return this.getUsersById([JSON.parse(claims).id]);
  }

  public auth() {
    const url = this.apiUrl + "/api/auth";
    return this.http.get<any>(url);
  }

  public logout(router: Router) {
    localStorage.removeItem('access_token');
    router.navigateByUrl('/login');
  }

  public getUserIdFromJWT() {
    if(localStorage.getItem('access_token')) {
      const claims = atob(localStorage.getItem('access_token')?.split('.')[1] as string);
      return JSON.parse(claims).id;
    }
  }

  public updateUser(imageData: Blob | null, username: string, bio: string, birthdate: string, role: string, school: string, subject: string, pic_deleted: boolean ) {
    const url = this.apiUrl + "/api/user";
    let formData = new FormData();
    if(imageData !== null) {
      formData.append('avatar', imageData);
    }
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('birthdate', birthdate);
    formData.append('role', role);
    formData.append('school', school);
    formData.append('subject', subject);
    if(pic_deleted)
      formData.append('pic_deleted', "true");
    return this.http.put(url, formData);
  }

  public uploadNote(images: File[], videos: File[], documents: File[], title: string, subject: string, school: string, tags: string[], description: string, markdown: string) {
    const url = this.apiUrl + "/api/notes";
    let formData = new FormData();
    for(let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    for(let i = 0; i < videos.length; i++) {
      formData.append('videos', videos[i]);
    }
    for(let i = 0; i < documents.length; i++) {
      formData.append('documents', documents[i]);
    }
    for(let i = 0; i < tags.length; i++) {
      formData.append('tags', tags[i]);
    }
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("school", school);
    formData.append("description", description);
    formData.append("markdown", markdown);
    return this.http.post(url, formData);
  }

  updateNote(title: string, subject: string, school: string, tags: string[], description: string, markdown: string, noteId: string) {
    const url = this.apiUrl + "/api/notes";
    let formData = new FormData();
    for(let i = 0; i < tags.length; i++) {
      formData.append('tags', tags[i]);
    }
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("school", school);
    formData.append("description", description);
    formData.append("markdown", markdown);
    formData.append("note_id", noteId);
    return this.http.put(url, formData);
  }

  deleteNote(id: string) {
    const url = this.apiUrl + "/api/notes";
    return this.http.delete(url, {body: {note_id: id}});
  }

  getRating(note_id: string) {
    const url = this.apiUrl + "/api/rate?note_id=" + note_id;
    return this.http.get<Rating>(url);
  }

  setRating(note_id: string, rating: number) {
    const url = this.apiUrl + "/api/rate";
    return this.http.post<any>(url, {note_id, rating});
  }

  setLike(comment_id: string, value: number) {
    const url = this.apiUrl + "/api/like";
    return this.http.post<any>(url, {comment_id, value});
  }
}
