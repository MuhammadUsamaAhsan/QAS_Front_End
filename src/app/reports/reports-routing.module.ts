import { ViewFabricSupplierComponent } from './view-fabric-supplier/view-fabric-supplier.component';
import { ViewFabricArticleComponent } from './view-fabric-article/view-fabric-article.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTopTenArticlesComponent } from './view-top-ten-articles/view-top-ten-articles.component';
import { ViewInspectionReportComponent } from './view-inspection-report/view-inspection-report.component';
import { ViewInspectionQualityComponent } from './view-inspection-quality/view-inspection-quality.component';
import { ViewFabricDefectsPointScoreComponent } from './view-fabric-defects-point-score/view-fabric-defects-point-score.component';
import { SupplierWiseArticlesComponent } from './supplier-wise-articles/supplier-wise-articles.component';
import { ViewSupplierOrdersMonthlyComponent } from './view-supplier-orders-monthly/view-supplier-orders-monthly.component';
import { ArticleCustomerSummaryComponent } from './article-customer-summary/article-customer-summary.component';

const routes: Routes = [

  { path: 'view-fabric-article' , component: ViewFabricArticleComponent  },
  { path: 'view-fabric-supplier' , component: ViewFabricSupplierComponent },
  { path: 'view-top-ten-articles' , component: ViewTopTenArticlesComponent },
  { path: 'view-inspection-report' , component:  ViewInspectionReportComponent },
  { path: 'view-inspection-quality' , component:  ViewInspectionQualityComponent},
  { path: 'view-fabric-defects-point-score' , component: ViewFabricDefectsPointScoreComponent},
  { path: 'supplier-wise-articles' , component: SupplierWiseArticlesComponent},
  { path: 'view-supplier-orders-monthly' , component: ViewSupplierOrdersMonthlyComponent},
  { path: 'article-customer-summary' , component: ArticleCustomerSummaryComponent}
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
