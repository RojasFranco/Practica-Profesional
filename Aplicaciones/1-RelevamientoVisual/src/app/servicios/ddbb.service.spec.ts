import { TestBed } from '@angular/core/testing';

import { DDBBService } from './ddbb.service';

describe('DDBBService', () => {
  let service: DDBBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DDBBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
