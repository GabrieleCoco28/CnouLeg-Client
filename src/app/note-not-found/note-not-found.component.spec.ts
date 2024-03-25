import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteNotFoundComponent } from './note-not-found.component';

describe('NoteNotFoundComponent', () => {
  let component: NoteNotFoundComponent;
  let fixture: ComponentFixture<NoteNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
