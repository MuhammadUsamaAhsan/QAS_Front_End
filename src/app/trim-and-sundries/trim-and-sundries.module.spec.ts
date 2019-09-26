import { TrimAndSundriesModule } from './trim-and-sundries.module';

describe('TrimAndSundriesModule', () => {
  let trimAndSundriesModule: TrimAndSundriesModule;

  beforeEach(() => {
    trimAndSundriesModule = new TrimAndSundriesModule();
  });

  it('should create an instance', () => {
    expect(trimAndSundriesModule).toBeTruthy();
  });
});
