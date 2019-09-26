import { TestBed, async, inject } from '@angular/core/testing';

import { TrimAndSundriesGuard } from './trim-and-sundries.guard';

describe('TrimAndSundriesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrimAndSundriesGuard]
    });
  });

  it('should ...', inject([TrimAndSundriesGuard], (guard: TrimAndSundriesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
