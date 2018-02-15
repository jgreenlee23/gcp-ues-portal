import { TestBed, inject } from '@angular/core/testing';

import { BigqueryService } from './bigquery-service.service';

describe('BigqueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BigqueryService]
    });
  });

  it('should be created', inject([BigqueryService], (service: BigqueryService) => {
    expect(service).toBeTruthy();
  }));
});
