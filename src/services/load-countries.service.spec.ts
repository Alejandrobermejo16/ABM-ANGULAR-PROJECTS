import { TestBed } from '@angular/core/testing';

import { LoadCountriesService } from './load-countries.service';

describe('LoadCountriesService', () => {
  let service: LoadCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
