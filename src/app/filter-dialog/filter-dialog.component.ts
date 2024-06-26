import { Component, Inject, inject } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatorService } from '../translator.service';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA, TAB } from '@angular/cdk/keycodes';

export interface FilterDialogData {
  rating: number,
  tags: string[],
  subject: string,
  school: string
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent {
  public tags: string[] = [];
  public announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes = [ENTER, COMMA, TAB] as const;
  public addOnBlur = true;
  public schoolValue = 'all';
  public subjectValue = 'all';
  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterDialogData,
    public translator: TranslatorService
  ) {
    this.tags = data.tags;
    this.subjectValue = data.subject;
    this.schoolValue = data.school;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public add(event: MatChipInputEvent): void {
    if(this.tags.length >= 5) return;
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
    this.data.tags = this.tags;
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
    this.data.tags = this.tags;
  }

  public edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
    this.data.tags = this.tags;
  }

  public setRatingFilter(value: number) {
    if(this.data.rating === value)
      this.data.rating = 0
    else
      this.data.rating = value;
  }

  public resetFilters() {
    this.setRatingFilter(0);
    this.tags = [];
    this.data.tags = [];
    this.setSubject("all");
    this.setSchool("all");
  }

  public keys(object: Object) {
    return Object.keys(object);
  }

  setSchool(school: string) {
    this.schoolValue = school;
    this.data.school = school;
  }

  setSubject(subject: string) {
    this.subjectValue = subject;
    this.data.subject = subject;
  }
}
