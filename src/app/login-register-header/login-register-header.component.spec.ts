import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterHeaderComponent } from './login-register-header.component';

describe('LoginRegisterHeaderComponent', () => {
  let component: LoginRegisterHeaderComponent;
  let fixture: ComponentFixture<LoginRegisterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRegisterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
