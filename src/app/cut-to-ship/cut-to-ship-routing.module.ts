import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCutToShipComponent } from './view-cut-to-ship/view-cut-to-ship.component';

const routes: Routes = [

  { path: 'view-cut-to-ship' , component: ViewCutToShipComponent  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutToShipRoutingModule { }
