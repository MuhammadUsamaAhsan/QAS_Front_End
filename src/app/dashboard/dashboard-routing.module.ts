import { TrimAndSundriesGuard } from './../trim-and-sundries/trim-and-sundries.guard';
import { PackingGuard } from './../packing/packing.guard';
import { CutToShipGuard } from './../cut-to-ship/cut-to-ship.guard';
import { FinishingGuard } from './../finishing/finishing.guard';
import { AuditGuard } from './../audit/audit.guard';
import { UserGuard } from './../user/user.guard';
import { FabricGuard } from './../fabric/fabric.guard';
import { DashboardGuard } from './dashboard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'components', loadChildren: '../components/components.module#ComponentsModule' },
      { path: 'forms', loadChildren: '../forms/forms.module#FormsLocalModule' },
      { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
      { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule' },
      { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
      { path: 'editors', loadChildren: '../editors/editors.module#EditorsModule' },
      { path: 'calendar', loadChildren: '../calendar/calendar.module#CalendarModule' },
      { path: 'user', loadChildren: '../user/user.module#UserModule',canActivate: [UserGuard]  },
      { path: 'fabric', loadChildren: '../fabric/fabric.module#FabricModule' ,canActivate: [FabricGuard]  },
      { path: 'supplier', loadChildren: '../supplier/supplier.module#SupplierModule',canActivate: [FabricGuard] },

      //{ path: 'supplier-order', loadChildren: '../supplier-order/supplier-order.module#SupplierOrderModule' },
      { path: 'manage-orders', loadChildren: '../manage-orders/manage-orders.module#ManageOrdersModule',canActivate: [FabricGuard] },
      { path: 'manage-rolls', loadChildren: '../manage-rolls/manage-rolls.module#ManageRollsModule',canActivate: [FabricGuard] },
      { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule',canActivate: [FabricGuard] },
      { path: 'lab-testing', loadChildren: '../lab-testing/lab-testing.module#LabTestingModule',canActivate: [FabricGuard] },
      { path: 'trim-and-sundries', loadChildren: '../trim-and-sundries/trim-and-sundries.module#TrimAndSundriesModule',canActivate: [TrimAndSundriesGuard] },//trims & sundires module
      { path: 'packing', loadChildren: '../packing/packing.module#PackingModule',canActivate: [PackingGuard] },//packing module
      { path: 'cut-to-ship', loadChildren: '../cut-to-ship/cut-to-ship.module#CutToShipModule',canActivate: [CutToShipGuard] },//cut to ship module
      { path: 'finishing', loadChildren: '../finishing/finishing.module#FinishingModule',canActivate: [FinishingGuard] },//finishing module
      { path: 'audit', loadChildren: '../audit/audit.module#AuditModule',canActivate: [AuditGuard] },//audit module



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
