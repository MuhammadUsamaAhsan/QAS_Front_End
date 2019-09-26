import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutToShipRoutingModule } from './cut-to-ship-routing.module';
import { ViewCutToShipComponent } from './view-cut-to-ship/view-cut-to-ship.component';

@NgModule({
  imports: [
    CommonModule,
    CutToShipRoutingModule
  ],
  declarations: [ViewCutToShipComponent]
})
export class CutToShipModule { }
