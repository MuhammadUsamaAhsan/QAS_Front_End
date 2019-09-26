import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFabricSupplierComponent } from './view-fabric-supplier.component';

describe('ViewFabricSupplierComponent', () => {
  let component: ViewFabricSupplierComponent;
  let fixture: ComponentFixture<ViewFabricSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFabricSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFabricSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
