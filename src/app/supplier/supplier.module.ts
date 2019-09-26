import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
    
  ],
  declarations: [AddSupplierComponent, EditSupplierComponent, ViewSupplierComponent]
})
export class SupplierModule { 

  

}
