import { FinishingModule } from './finishing.module';

describe('FinishingModule', () => {
  let finishingModule: FinishingModule;

  beforeEach(() => {
    finishingModule = new FinishingModule();
  });

  it('should create an instance', () => {
    expect(finishingModule).toBeTruthy();
  });
});
