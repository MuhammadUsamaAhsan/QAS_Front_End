import { FabricGuard } from './fabric/fabric.guard';
import { MasterGuard } from './master/master.guard';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';

//import {LoginComponent} from

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch:'full',

  },
  {
     path: 'login',
     component:LoginComponent

  },
//   {
//     path: 'dashboard',
//     redirectTo: '/dashboard',
//     pathMatch:'full',

//     component: DashboardComponent

//  },

  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'dashboard/dashboard-home', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate: [MasterGuard],
  data: { guards: [DashboardGuard, FabricGuard], guardsRelation: 'OR' }},
  { path: '', loadChildren: './user/user.module#UserModule' },
  { path: '', loadChildren: './fabric/fabric.module#FabricModule',canActivateChild: [FabricGuard] },
  { path: '', loadChildren: './supplier/supplier.module#SupplierModule' },
  { path: '', loadChildren: './manage-orders/manage-orders.module#ManageOrdersModule' },
  { path: '', loadChildren: './manage-rolls/manage-rolls.module#ManageRollsModule' },
  { path: '', loadChildren: './reports/reports.module#ReportsModule' },
  { path: '', loadChildren: './lab-testing/lab-testing.module#LabTestingModule' },
  { path: '', loadChildren: './trim-and-sundries/trim-and-sundries.module#TrimAndSundriesModule' },//trims & sundires module
  { path: '', loadChildren: './packing/packing.module#PackingModule' },//packing module
  { path: '', loadChildren: './cut-to-ship/cut-to-ship.module#CutToShipModule' },//cut to ship module
  { path: '', loadChildren: './finishing/finishing.module#FinishingModule' },//finishing module
  { path: '', loadChildren: './audit/audit.module#AuditModule' },//audit module
  { path: 'forms', loadChildren: './forms/forms.module#FormsLocalModule',canActivateChild: [FabricGuard] },
  { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
  { path: 'components', loadChildren: './components/components.module#ComponentsModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
