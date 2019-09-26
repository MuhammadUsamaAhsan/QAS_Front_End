import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinishingComponent } from './view-finishing.component';

describe('ViewFinishingComponent', () => {
  let component: ViewFinishingComponent;
  let fixture: ComponentFixture<ViewFinishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFinishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFinishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
