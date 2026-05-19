import { TestBed } from '@angular/core/testing';

import { CycleMessageService } from './cycle-message-service';

describe('CycleMessageService', () => {
  let service: CycleMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CycleMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
