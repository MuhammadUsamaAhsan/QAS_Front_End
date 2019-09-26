import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeHomeLaundryComponent } from './three-home-laundry.component';

describe('ThreeHomeLaundryComponent', () => {
  let component: ThreeHomeLaundryComponent;
  let fixture: ComponentFixture<ThreeHomeLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeHomeLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeHomeLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
