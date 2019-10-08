import { TestBed } from '@angular/core/testing';

import { EscolhaService } from './escolha.service';

describe('EscolhaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscolhaService = TestBed.get(EscolhaService);
    expect(service).toBeTruthy();
  });
});
