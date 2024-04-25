import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarCopiedToClipboardComponent } from './snack-bar-copied-to-clipboard.component';

describe('SnackBarCopiedToClipboardComponent', () => {
  let component: SnackBarCopiedToClipboardComponent;
  let fixture: ComponentFixture<SnackBarCopiedToClipboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarCopiedToClipboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackBarCopiedToClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
