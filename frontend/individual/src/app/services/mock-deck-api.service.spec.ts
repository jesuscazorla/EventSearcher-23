import { TestBed } from '@angular/core/testing';

import { MockDeckApiService } from './mock-deck-api.service';

describe('MockDeckApiService', () => {
  let service: MockDeckApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDeckApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
