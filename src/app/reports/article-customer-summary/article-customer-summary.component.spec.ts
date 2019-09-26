import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCustomerSummaryComponent } from './article-customer-summary.component';

describe('ArticleCustomerSummaryComponent', () => {
  let component: ArticleCustomerSummaryComponent;
  let fixture: ComponentFixture<ArticleCustomerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCustomerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCustomerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
