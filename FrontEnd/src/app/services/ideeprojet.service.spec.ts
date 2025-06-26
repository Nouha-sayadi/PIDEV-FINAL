import { TestBed } from '@angular/core/testing';

import { IdeeprojetService } from './ideeprojet.service';

describe('IdeeprojetService', () => {
  let service: IdeeprojetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeeprojetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
