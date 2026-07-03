import { TestBed } from '@angular/core/testing';

import { landingService } from './landing.service';

describe('Landing', () => {
  let service: landingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(landingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
