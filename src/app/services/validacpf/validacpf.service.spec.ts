import { TestBed } from '@angular/core/testing';

import { ValidacpfService } from './validacpf.service';

describe('ValidacpfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidacpfService = TestBed.get(ValidacpfService);
    expect(service).toBeTruthy();
  });
});
