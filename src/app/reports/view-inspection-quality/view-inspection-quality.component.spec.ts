import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInspectionQualityComponent } from './view-inspection-quality.component';

describe('ViewInspectionQualityComponent', () => {
  let component: ViewInspectionQualityComponent;
  let fixture: ComponentFixture<ViewInspectionQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInspectionQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInspectionQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
