import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginDoctorPage } from './login-doctor.page';

describe('LoginDoctorPage', () => {
  let component: LoginDoctorPage;
  let fixture: ComponentFixture<LoginDoctorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
