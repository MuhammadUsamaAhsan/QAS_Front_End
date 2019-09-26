import { TestBed, async, inject } from '@angular/core/testing';

import { FabricGuard } from './fabric.guard';

describe('FabricGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FabricGuard]
    });
  });

  it('should ...', inject([FabricGuard], (guard: FabricGuard) => {
    expect(guard).toBeTruthy();
  }));
});
