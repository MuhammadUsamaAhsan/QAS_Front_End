

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from '../manage-orders/add-order/add-order.component';
import { ViewOrderComponent } from '../manage-orders/view-order/view-order.component';
import { EditOrderComponent } from '../manage-orders/edit-order/edit-order.component';



const routes: Routes = [

  { path: 'add-order' , component: AddOrderComponent },
  { path: 'edit-order' , component: EditOrderComponent },
  { path: 'view-order' , component: ViewOrderComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrdersRoutingModule { }
