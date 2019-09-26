import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStandardWashComponent } from './view-standard-wash.component';

describe('ViewStandardWashComponent', () => {
  let component: ViewStandardWashComponent;
  let fixture: ComponentFixture<ViewStandardWashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStandardWashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStandardWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
