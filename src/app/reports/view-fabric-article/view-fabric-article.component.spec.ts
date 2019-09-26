import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFabricArticleComponent } from './view-fabric-article.component';

describe('ViewFabricArticleComponent', () => {
  let component: ViewFabricArticleComponent;
  let fixture: ComponentFixture<ViewFabricArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFabricArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFabricArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
