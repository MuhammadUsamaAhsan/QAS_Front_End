import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStandardWashComponent } from './edit-standard-wash.component';

describe('EditStandardWashComponent', () => {
  let component: EditStandardWashComponent;
  let fixture: ComponentFixture<EditStandardWashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStandardWashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStandardWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
