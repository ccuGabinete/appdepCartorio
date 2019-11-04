import { TestBed } from '@angular/core/testing';

import { AberturaService } from './abertura.service';

describe('AberturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AberturaService = TestBed.get(AberturaService);
    expect(service).toBeTruthy();
  });
});
