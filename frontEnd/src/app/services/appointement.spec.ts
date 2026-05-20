import { TestBed } from '@angular/core/testing';

import { Appointement } from './appointement';

describe('Appointement', () => {
  let service: Appointement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Appointement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
