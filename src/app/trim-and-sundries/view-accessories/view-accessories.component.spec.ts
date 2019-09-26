import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccessoriesComponent } from './view-accessories.component';

describe('ViewAccessoriesComponent', () => {
  let component: ViewAccessoriesComponent;
  let fixture: ComponentFixture<ViewAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
