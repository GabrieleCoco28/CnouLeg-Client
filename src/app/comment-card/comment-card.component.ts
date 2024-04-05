import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  public subcommentsIdsLoaded: string[] = [];
  public subcommentsInfo: Comment[] = [{} as Comment];
  panelOpenStateAnswer = false;
  panelOpenState = false;

  constructor(
    private cnoulegAPIService: CnouLegAPIService,
    private el: ElementRef,
    public translator: TranslatorService,
    private ref: ChangeDetectorRef
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
          this.data.author_name = v.username;
          const elements = (<HTMLElement>(
            this.el.nativeElement
          )).querySelectorAll('._' + v._id);
          elements.forEach((e) => {
            e.setAttribute(
              'style',
              `background-image: url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.profile_pic_url})`
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
                (v2) => v2._id === v.user_id
              )?.username;
            });
            response.users.map((v: User) => {
              const elements = (<HTMLElement>(
                this.el.nativeElement
              )).querySelectorAll('._' + v._id);
              elements.forEach((e) => {
                e.setAttribute(
                  'style',
                  `background-image: url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.profile_pic_url})`
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

    const finalDate = `${year}-${
      month + 1 < 10 ? '0' + (month + 1) : month + 1
    }-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
    const input = this.el.nativeElement.querySelector(
      '.answer'
    ) as HTMLInputElement;
    if (input.value.trim().length > 0) {
      this.cnoulegAPIService
        .addComment(input.value.trim(), this.data.user_id /*todo replace it with actual user id*/, null, this.data._id, finalDate)
        .subscribe((res) => {
          this.subcommentsInfo.unshift({
            _id: res.value.insertedId,
            text: input.value.trim(),
            user_id: this.data.user_id, //todo replace it with actual user id
            post_id: null,
            parent_id: this.data._id,
            likes: 0,
            date: finalDate,
            has_children: false,
          });
          input.value = '';
          this.panelOpenStateAnswer = !this.panelOpenStateAnswer;
          this.panelOpenState = true;
          this.loadSubComments();
          this.ref.detectChanges();
        });
    }
  }

  random(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
