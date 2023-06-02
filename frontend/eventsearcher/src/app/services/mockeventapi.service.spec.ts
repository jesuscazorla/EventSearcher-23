import { TestBed } from '@angular/core/testing';

import { MockeventapiService } from './mockeventapi.service';

describe('MockeventapiService', () => {
  let service: MockeventapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockeventapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
