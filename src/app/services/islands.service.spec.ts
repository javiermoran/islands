import { TestBed } from '@angular/core/testing';

import { IslandsService } from './islands.service';

describe('IslandsService', () => {
  let service: IslandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IslandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
