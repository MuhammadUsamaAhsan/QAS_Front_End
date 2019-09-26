import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRollComponent } from './view-roll.component';

describe('ViewRollComponent', () => {
  let component: ViewRollComponent;
  let fixture: ComponentFixture<ViewRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
