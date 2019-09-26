import { TestBed, async, inject } from '@angular/core/testing';

import { CutToShipGuard } from './cut-to-ship.guard';

describe('CutToShipGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CutToShipGuard]
    });
  });

  it('should ...', inject([CutToShipGuard], (guard: CutToShipGuard) => {
    expect(guard).toBeTruthy();
  }));
});
