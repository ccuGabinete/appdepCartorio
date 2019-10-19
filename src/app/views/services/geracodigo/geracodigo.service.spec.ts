import { TestBed } from '@angular/core/testing';

import { GeracodigoService } from './geracodigo.service';

describe('GeracodigoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeracodigoService = TestBed.get(GeracodigoService);
    expect(service).toBeTruthy();
  });
});
