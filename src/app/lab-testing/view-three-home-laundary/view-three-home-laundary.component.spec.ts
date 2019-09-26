import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewThreeHomeLaundaryComponent } from './view-three-home-laundary.component';

describe('ViewThreeHomeLaundaryComponent', () => {
  let component: ViewThreeHomeLaundaryComponent;
  let fixture: ComponentFixture<ViewThreeHomeLaundaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewThreeHomeLaundaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewThreeHomeLaundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
