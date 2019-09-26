import { PackingModule } from './packing.module';

describe('PackingModule', () => {
  let packingModule: PackingModule;

  beforeEach(() => {
    packingModule = new PackingModule();
  });

  it('should create an instance', () => {
    expect(packingModule).toBeTruthy();
  });
});
