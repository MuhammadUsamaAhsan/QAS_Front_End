import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierOrdersMonthlyComponent } from './view-supplier-orders-monthly.component';

describe('ViewSupplierOrdersMonthlyComponent', () => {
  let component: ViewSupplierOrdersMonthlyComponent;
  let fixture: ComponentFixture<ViewSupplierOrdersMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierOrdersMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierOrdersMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
