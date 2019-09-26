import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackingComponent } from './edit-packing.component';

describe('EditPackingComponent', () => {
  let component: EditPackingComponent;
  let fixture: ComponentFixture<EditPackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
