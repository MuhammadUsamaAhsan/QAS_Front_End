import { TestBed, async, inject } from '@angular/core/testing';

import { FinishingGuard } from './finishing.guard';

describe('FinishingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinishingGuard]
    });
  });

  it('should ...', inject([FinishingGuard], (guard: FinishingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
