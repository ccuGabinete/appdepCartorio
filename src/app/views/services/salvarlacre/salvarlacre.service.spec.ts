import { TestBed } from '@angular/core/testing';

import { SalvarlacreService } from './salvarlacre.service';

describe('SalvarlacreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalvarlacreService = TestBed.get(SalvarlacreService);
    expect(service).toBeTruthy();
  });
});
