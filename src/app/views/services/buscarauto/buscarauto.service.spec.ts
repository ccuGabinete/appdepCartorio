import { TestBed } from '@angular/core/testing';

import { BuscarautoService } from './buscarauto.service';

describe('BuscarautoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuscarautoService = TestBed.get(BuscarautoService);
    expect(service).toBeTruthy();
  });
});
