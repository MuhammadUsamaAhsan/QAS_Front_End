import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCutToShipComponent } from './view-cut-to-ship.component';

describe('ViewCutToShipComponent', () => {
  let component: ViewCutToShipComponent;
  let fixture: ComponentFixture<ViewCutToShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCutToShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCutToShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
