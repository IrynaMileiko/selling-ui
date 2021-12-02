import { TestBed } from '@angular/core/testing';

import { UrlInfoService } from './url-info.service';

describe('UrlInfoService', () => {
  let service: UrlInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
