import { TestBed, inject } from '@angular/core/testing';

import { ModuleserviceService } from './moduleservice.service';

describe('ModuleserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleserviceService]
    });
  });

  it('should be created', inject([ModuleserviceService], (service: ModuleserviceService) => {
    expect(service).toBeTruthy();
  }));
});
