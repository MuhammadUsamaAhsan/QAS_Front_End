import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackingComponent } from './add-packing.component';

describe('AddPackingComponent', () => {
  let component: AddPackingComponent;
  let fixture: ComponentFixture<AddPackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
