import { TestBed } from '@angular/core/testing';

import { GerardataService } from './gerardata.service';

describe('GerardataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GerardataService = TestBed.get(GerardataService);
    expect(service).toBeTruthy();
  });
});
