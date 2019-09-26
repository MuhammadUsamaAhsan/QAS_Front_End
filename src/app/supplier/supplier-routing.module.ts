import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';


const routes: Routes = [
  { path: 'add-supplier' , component: AddSupplierComponent },
  { path: 'edit-supplier', component: EditSupplierComponent },
 
  { path: 'view-supplier', component: ViewSupplierComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
