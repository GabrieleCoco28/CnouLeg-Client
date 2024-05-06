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
import { MatDialog } from '@angular/material/dialog';
import { AccessDialogComponent } from '../access-dialog/access-dialog.component';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent implements OnInit {
  @Input() data!: Comment;
  @ViewChild("likeLabel") likeLabel!: ElementRef<HTMLElement>;
  public subcommentsIdsLoaded: string[] = [];
  public subcommentsInfo: Comment[] = [{} as Comment];
  panelOpenStateAnswer = false;
  panelOpenState = false;

  constructor(
    private cnoulegAPIService: CnouLegAPIService,
    private el: ElementRef,
    public translator: TranslatorService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadComment();
    this.loadSubComments();
  }

  ngAfterViewInit() {
    this.auth();
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
            if(v.profile_pic_url !== "") {
              e.setAttribute(
                'style',
                `background-image: url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.profile_pic_url})`
              );
            }
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
                if(v.profile_pic_url !== "") {
                  e.setAttribute(
                    'style',
                    `background-image: url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.profile_pic_url})`
                  );
                }
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
    if (localStorage.getItem('access_token') === null) {
      this.dialog.open(AccessDialogComponent);
      return;
    }
    this.panelOpenStateAnswer = !this.panelOpenStateAnswer;
  }
  answer(e: Event) {
    e.preventDefault();
    if (localStorage.getItem('access_token') === null) {
      this.dialog.open(AccessDialogComponent);
      return;
    }
    const input = this.el.nativeElement.querySelector(
      '.answer'
    ) as HTMLInputElement;
    if (input.value.trim().length > 0) {
      this.cnoulegAPIService
        .addComment(input.value.trim(), null, this.data._id)
        .subscribe((res) => {
          this.cnoulegAPIService.getUserByJwt().subscribe((v) => {
            this.subcommentsInfo.push({
              _id: res.insertedId,
              text: input.value.trim(),
              user_id: v.users[0]._id,
              post_id: null,
              parent_id: this.data._id,
              likes: 0,
              date: res.uploadDate,
              has_children: false,
            });
            input.value = '';
            this.panelOpenStateAnswer = !this.panelOpenStateAnswer;
            this.panelOpenState = true;
            this.loadSubComments();
            this.ref.detectChanges();
          });
        });
    }
  }

  auth() {
    if (localStorage.getItem('access_token')) {
      this.cnoulegAPIService.auth().subscribe({
        next: (v) => {
          this.cnoulegAPIService.getUserByJwt().subscribe((v) => {
            if (v.users[0].profile_pic_url === '') {
              (
                this.el.nativeElement.querySelector(
                  '.subcomment_avatar'
                ) as HTMLElement
              ).style.backgroundImage = `url(../../assets/default.svg)`;
            } else
              (
                this.el.nativeElement.querySelector(
                  '.subcomment_avatar'
                ) as HTMLElement
              ).style.backgroundImage = `url(${this.cnoulegAPIService.apiUrl}/profile_pics/${v.users[0].profile_pic_url})`;
          });
        },
        error: (v) => {
          (
            this.el.nativeElement.querySelector(
              '.subcomment_avatar'
            ) as HTMLElement
          ).style.backgroundImage = `url(../../assets/default.svg)`;
        },
      });
    } else {
      (
        this.el.nativeElement.querySelector('.subcomment_avatar') as HTMLElement
      ).style.backgroundImage = `url(../../assets/default.svg)`;
    }
  }

  setCommentLike(value: number) {
    if(this.data.user_like) {
      this.cnoulegAPIService.setLike(this.data._id, (value === this.data.user_like ? 0 : value)).subscribe({
        next: () => {
          if(value === this.data.user_like)
            this.data.likes = this.data.likes - Math.sign(this.data.user_like);
          else
            this.data.likes = this.data.likes - Math.sign(this.data.user_like as number) + Math.sign(value);
          this.data.user_like = Math.sign((value === this.data.user_like ? 0 : value));
        },
        error: () => {
          this.dialog.open(AccessDialogComponent);
        }
      })
    } else {
      this.cnoulegAPIService.setLike(this.data._id, value).subscribe({
        next: () => {
          this.data.likes = this.data.likes + Math.sign(value);
          this.data.user_like = Math.sign(value);
        },
        error: () => {
          this.dialog.open(AccessDialogComponent);
        }
      })
    }
  }

  setSubcommentLike(value: number, index: number) {
    if(this.subcommentsInfo[index].user_like) {
      this.cnoulegAPIService.setLike(this.subcommentsInfo[index]._id, (value === this.subcommentsInfo[index].user_like ? 0 : value)).subscribe({
        next: () => {
          if(value === this.subcommentsInfo[index].user_like)
            this.subcommentsInfo[index].likes = this.subcommentsInfo[index].likes - Math.sign(this.subcommentsInfo[index].user_like as number);
          else
            this.subcommentsInfo[index].likes = this.subcommentsInfo[index].likes - Math.sign(this.subcommentsInfo[index].user_like as number) + Math.sign(value);
          this.subcommentsInfo[index].user_like = Math.sign((value === this.subcommentsInfo[index].user_like ? 0 : value));
        },
        error: () => {
          this.dialog.open(AccessDialogComponent);
        }
      })
    } else {
      this.cnoulegAPIService.setLike(this.subcommentsInfo[index]._id, value).subscribe({
        next: () => {
          this.subcommentsInfo[index].likes = this.subcommentsInfo[index].likes + Math.sign(value);
          this.subcommentsInfo[index].user_like = Math.sign(value);
        },
        error: () => {
          this.dialog.open(AccessDialogComponent);
        }
      })
    }
  }
}
