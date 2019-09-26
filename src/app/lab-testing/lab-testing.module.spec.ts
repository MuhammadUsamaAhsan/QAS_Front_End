import { LabTestingModule } from './lab-testing.module';

describe('LabTestingModule', () => {
  let labTestingModule: LabTestingModule;

  beforeEach(() => {
    labTestingModule = new LabTestingModule();
  });

  it('should create an instance', () => {
    expect(labTestingModule).toBeTruthy();
  });
});
