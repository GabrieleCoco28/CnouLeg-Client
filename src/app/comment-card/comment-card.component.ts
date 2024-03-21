import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent {
  public arr: number[] = [];
  panelOpenState = false;

  constructor() {
    this.arr.length = this.getRandomValue(0, 5);
  }

  getRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
