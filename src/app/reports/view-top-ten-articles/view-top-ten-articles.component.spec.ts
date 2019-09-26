import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopTenArticlesComponent } from './view-top-ten-articles.component';

describe('ViewTopTenArticlesComponent', () => {
  let component: ViewTopTenArticlesComponent;
  let fixture: ComponentFixture<ViewTopTenArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTopTenArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTopTenArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
