import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFabricComponent } from './view-fabric.component';

describe('ViewFabricComponent', () => {
  let component: ViewFabricComponent;
  let fixture: ComponentFixture<ViewFabricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFabricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFabricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
