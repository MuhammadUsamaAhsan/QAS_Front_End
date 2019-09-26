import { TestBed } from '@angular/core/testing';

import { GenericHeaderService } from './generic-header.service';

describe('GenericHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericHeaderService = TestBed.get(GenericHeaderService);
    expect(service).toBeTruthy();
  });
});
