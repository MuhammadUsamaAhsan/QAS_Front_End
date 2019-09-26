import { ManageRollsModule } from './manage-rolls.module';

describe('ManageRollsModule', () => {
  let manageRollsModule: ManageRollsModule;

  beforeEach(() => {
    manageRollsModule = new ManageRollsModule();
  });

  it('should create an instance', () => {
    expect(manageRollsModule).toBeTruthy();
  });
});
