import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotViewComponent } from './lot-view.component';

describe('LotViewComponent', () => {
  let component: LotViewComponent;
  let fixture: ComponentFixture<LotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
