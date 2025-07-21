import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteDashboardPage } from './paciente-dashboard.page';

describe('PacienteDashboardPage', () => {
  let component: PacienteDashboardPage;
  let fixture: ComponentFixture<PacienteDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
