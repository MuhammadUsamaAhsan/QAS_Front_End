import { TestBed, async, inject } from '@angular/core/testing';

import { AuditGuard } from './audit.guard';

describe('AuditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditGuard]
    });
  });

  it('should ...', inject([AuditGuard], (guard: AuditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
