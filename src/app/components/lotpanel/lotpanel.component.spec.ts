import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotpanelComponent } from './lotpanel.component';

describe('LotpanelComponent', () => {
  let component: LotpanelComponent;
  let fixture: ComponentFixture<LotpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
