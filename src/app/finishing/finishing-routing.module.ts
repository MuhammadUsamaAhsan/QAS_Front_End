import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFinishingComponent } from './view-finishing/view-finishing.component';

const routes: Routes = [

  { path: 'view-finishing' , component: ViewFinishingComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishingRoutingModule { }
