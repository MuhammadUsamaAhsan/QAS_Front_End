import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThreeHomeLaundaryComponent } from './edit-three-home-laundary.component';

describe('EditThreeHomeLaundaryComponent', () => {
  let component: EditThreeHomeLaundaryComponent;
  let fixture: ComponentFixture<EditThreeHomeLaundaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThreeHomeLaundaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThreeHomeLaundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
