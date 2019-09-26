import { CutToShipModule } from './cut-to-ship.module';

describe('CutToShipModule', () => {
  let cutToShipModule: CutToShipModule;

  beforeEach(() => {
    cutToShipModule = new CutToShipModule();
  });

  it('should create an instance', () => {
    expect(cutToShipModule).toBeTruthy();
  });
});
