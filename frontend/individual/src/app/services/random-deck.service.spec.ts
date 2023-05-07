import { TestBed } from '@angular/core/testing';

import { RandomDeckService } from './random-deck.service';

describe('RandomDeckService', () => {
  let service: RandomDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
