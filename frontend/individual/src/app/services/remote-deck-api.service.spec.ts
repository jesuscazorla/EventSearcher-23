import { TestBed } from '@angular/core/testing';

import { RemoteDeckApiService } from './remote-deck-api.service';

describe('RemoteDeckApiService', () => {
  let service: RemoteDeckApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteDeckApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
