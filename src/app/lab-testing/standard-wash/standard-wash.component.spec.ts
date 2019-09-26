import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardWashComponent } from './standard-wash.component';

describe('StandardWashComponent', () => {
  let component: StandardWashComponent;
  let fixture: ComponentFixture<StandardWashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardWashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
