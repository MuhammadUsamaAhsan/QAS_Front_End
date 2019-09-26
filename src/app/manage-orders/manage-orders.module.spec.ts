import { ManageOrdersModule } from './manage-orders.module';

describe('ManageOrdersModule', () => {
  let manageOrdersModule: ManageOrdersModule;

  beforeEach(() => {
    manageOrdersModule = new ManageOrdersModule();
  });

  it('should create an instance', () => {
    expect(manageOrdersModule).toBeTruthy();
  });
});
