import { TestBed } from '@angular/core/testing';

import { OpensnackbarService } from './opensnackbar.service';

describe('OpensnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpensnackbarService = TestBed.get(OpensnackbarService);
    expect(service).toBeTruthy();
  });
});
