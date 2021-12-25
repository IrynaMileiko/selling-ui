import { TestBed } from '@angular/core/testing';

import { MessageCenterService } from './message-center.service';

describe('MessageCenterService', () => {
  let service: MessageCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
