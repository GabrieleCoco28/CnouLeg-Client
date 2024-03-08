import { TestBed } from '@angular/core/testing';

import { CnouLegAPIService } from './cnou-leg-api.service';

describe('CnouLegAPIService', () => {
  let service: CnouLegAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CnouLegAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
