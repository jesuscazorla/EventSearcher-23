import { TestBed } from '@angular/core/testing';

import { RemoteScrapperService } from './remote-scrapper.service';

describe('RemoteScrapperService', () => {
  let service: RemoteScrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteScrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
