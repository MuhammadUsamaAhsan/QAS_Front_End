import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFabricDefectsPointScoreComponent } from './view-fabric-defects-point-score.component';

describe('ViewFabricDefectsPointScoreComponent', () => {
  let component: ViewFabricDefectsPointScoreComponent;
  let fixture: ComponentFixture<ViewFabricDefectsPointScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFabricDefectsPointScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFabricDefectsPointScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
