import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrdersRoutingModule } from './manage-orders-routing.module';
import { AddOrderComponent } from '../manage-orders/add-order/add-order.component';
import { ViewOrderComponent } from '../manage-orders/view-order/view-order.component';
import { EditOrderComponent } from '../manage-orders/edit-order/edit-order.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  imports: [
    CommonModule,
    ManageOrdersRoutingModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})


  ],
  declarations: [AddOrderComponent, ViewOrderComponent, EditOrderComponent]
})
export class ManageOrdersModule { }
