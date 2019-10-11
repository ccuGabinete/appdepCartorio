import { TestBed } from '@angular/core/testing';

import { BuscalacreService } from './buscalacre.service';

describe('BuscalacreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscalacreService = TestBed.get(BuscalacreService);
    expect(service).toBeTruthy();
  });
});
