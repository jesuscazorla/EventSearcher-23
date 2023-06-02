import { TestBed } from '@angular/core/testing';

import { RemoteApiService } from './remote-api.service';

describe('ApiService', () => {
  let service: RemoteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
