import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotManagementComponent } from './lot-management.component';

describe('LotManagementComponent', () => {
  let component: LotManagementComponent;
  let fixture: ComponentFixture<LotManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
