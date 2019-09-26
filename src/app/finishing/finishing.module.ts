import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishingRoutingModule } from './finishing-routing.module';
import { ViewFinishingComponent } from './view-finishing/view-finishing.component';

@NgModule({
  imports: [
    CommonModule,
    FinishingRoutingModule
  ],
  declarations: [ViewFinishingComponent]
})
export class FinishingModule { }
