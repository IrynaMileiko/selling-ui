import { TestBed } from '@angular/core/testing';

import { LotValidationService } from './lot-validation.service';

describe('LotValidationService', () => {
  let service: LotValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
