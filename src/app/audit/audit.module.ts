import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { ViewAuditComponent } from './view-audit/view-audit.component';

@NgModule({
  imports: [
    CommonModule,
    AuditRoutingModule
  ],
  declarations: [ViewAuditComponent]
})
export class AuditModule { }
