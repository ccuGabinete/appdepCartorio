import { TestBed } from '@angular/core/testing';

import { SalvaratendimentoService } from './salvaratendimento.service';

describe('SalvaratendimentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalvaratendimentoService = TestBed.get(SalvaratendimentoService);
    expect(service).toBeTruthy();
  });
});
