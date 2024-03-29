import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  CnouLegAPIService,
  Comment,
  User,
  Users,
} from '../cnou-leg-api.service';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent implements OnInit {
  @Input() data!: Comment;
  public subcommentsIdsLoaded: number[] = [];
  public subcommentsInfo: Comment[] = [{} as Comment];
  panelOpenStateAnswer = false;
  panelOpenState = false;

  constructor(
    private cnoulegAPIService: CnouLegAPIService,
    private el: ElementRef,
    public translator: TranslatorService
  ) {}
  ngOnInit(): void {
    this.loadComment();
    this.loadSubComments();
  }

  loadComment() {
    this.cnoulegAPIService
      .getUsersById([this.data.user_id])
      .subscribe((response: Users) => {
        response.users.map((v: User) => {
          this.data.author_name = v.name;
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
      });
  }

  loadSubComments() {
    this.cnoulegAPIService.getComments(this.data._id, 'comment').subscribe({
      next: (response) => {
        this.subcommentsInfo = response.comments;
        this.cnoulegAPIService
          .getUsersById(this.subcommentsIdsLoaded)
          .subscribe((response: Users) => {
            this.subcommentsInfo.map((v) => {
              v.author_name = response.users.find(
                (v2) => v2.id === v.user_id
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
          });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  toggleAnswerPanel(e: Event) {
    e.preventDefault();
    this.panelOpenStateAnswer = !this.panelOpenStateAnswer;
  }
  answer(e: Event) {
    e.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const finalDate = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    const input = this.el.nativeElement.querySelector(".answer") as HTMLInputElement;
    if(input.value.trim().length > 0)
      this.cnoulegAPIService.addComment(input.value.trim(), this.random(4, 5), null, this.data._id, finalDate).subscribe((res) => console.log(res));
  }

  random(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
