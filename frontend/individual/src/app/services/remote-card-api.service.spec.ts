import { TestBed } from '@angular/core/testing';

import { RemoteCardApiService } from './remote-card-api.service';

describe('RemoteCardApiService', () => {
  let service: RemoteCardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteCardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
