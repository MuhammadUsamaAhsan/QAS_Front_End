import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAuditComponent } from './view-audit/view-audit.component';
const routes: Routes = [

  { path: 'view-audit' , component: ViewAuditComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule { }
