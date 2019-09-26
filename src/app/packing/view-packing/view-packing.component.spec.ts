import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPackingComponent } from './view-packing.component';

describe('ViewPackingComponent', () => {
  let component: ViewPackingComponent;
  let fixture: ComponentFixture<ViewPackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
