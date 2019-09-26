import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRollComponent } from './edit-roll.component';

describe('EditRollComponent', () => {
  let component: EditRollComponent;
  let fixture: ComponentFixture<EditRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
