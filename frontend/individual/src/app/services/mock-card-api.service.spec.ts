import { TestBed } from '@angular/core/testing';

import { MockCardApiService } from './mock-card-api.service';

describe('MockCardApiService', () => {
  let service: MockCardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
