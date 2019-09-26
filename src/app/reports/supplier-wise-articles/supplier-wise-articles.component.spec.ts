import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierWiseArticlesComponent } from './supplier-wise-articles.component';

describe('SupplierWiseArticlesComponent', () => {
  let component: SupplierWiseArticlesComponent;
  let fixture: ComponentFixture<SupplierWiseArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierWiseArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierWiseArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
