import { TestBed, async, inject } from '@angular/core/testing';

import { PackingGuard } from './packing.guard';

describe('PackingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackingGuard]
    });
  });

  it('should ...', inject([PackingGuard], (guard: PackingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
