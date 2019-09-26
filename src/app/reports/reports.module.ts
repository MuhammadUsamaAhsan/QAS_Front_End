import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ViewFabricSupplierComponent } from './view-fabric-supplier/view-fabric-supplier.component';
import { ViewFabricArticleComponent } from './view-fabric-article/view-fabric-article.component';
import { ViewTopTenArticlesComponent } from './view-top-ten-articles/view-top-ten-articles.component';
import { ViewInspectionReportComponent } from './view-inspection-report/view-inspection-report.component';
import { ViewInspectionQualityComponent } from './view-inspection-quality/view-inspection-quality.component';
//import { FormsModule } from '@angular/forms';
import { ViewFabricDefectsPointScoreComponent } from './view-fabric-defects-point-score/view-fabric-defects-point-score.component';
import { SupplierWiseArticlesComponent } from './supplier-wise-articles/supplier-wise-articles.component';
import { ViewSupplierOrdersMonthlyComponent } from './view-supplier-orders-monthly/view-supplier-orders-monthly.component';
import { ArticleCustomerSummaryComponent } from './article-customer-summary/article-customer-summary.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
//import { NgSelectModule } from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    DataTablesModule,
    FormsModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})

  ],
  declarations: [ViewFabricSupplierComponent, ViewFabricArticleComponent, ViewTopTenArticlesComponent, ViewInspectionReportComponent, ViewInspectionQualityComponent, ViewFabricDefectsPointScoreComponent, SupplierWiseArticlesComponent, ViewSupplierOrdersMonthlyComponent, ArticleCustomerSummaryComponent]
})
export class ReportsModule { }
