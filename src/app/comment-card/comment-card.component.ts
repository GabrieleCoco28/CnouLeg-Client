import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  CnouLegAPIService,
  Comment,
  User,
  Users,
} from '../cnou-leg-api.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent implements OnInit {
  @Input() data!: Comment;
  public subcommentsIdsLoaded: number[] = [];
  public subcommentsInfo: Comment[] = [{} as Comment];
  panelOpenState = false;

  constructor(
    private cnoulegAPIService: CnouLegAPIService,
    private el: ElementRef
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
}
