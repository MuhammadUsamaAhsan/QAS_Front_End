import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRollComponent } from './add-roll.component';

describe('AddRollComponent', () => {
  let component: AddRollComponent;
  let fixture: ComponentFixture<AddRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
