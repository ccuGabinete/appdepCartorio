import { TestBed } from '@angular/core/testing';

import { SalvardoacaoService } from './salvardoacao.service';

describe('SalvardoacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalvardoacaoService = TestBed.get(SalvardoacaoService);
    expect(service).toBeTruthy();
  });
});
