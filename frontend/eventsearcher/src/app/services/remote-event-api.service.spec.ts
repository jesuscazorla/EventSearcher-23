import { TestBed } from '@angular/core/testing';

import { RemoteEventApiService } from './remote-event-api.service';

describe('RemoteEventApiService', () => {
  let service: RemoteEventApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteEventApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
