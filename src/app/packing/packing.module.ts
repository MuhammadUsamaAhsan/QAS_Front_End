import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingRoutingModule } from './packing-routing.module';
import { AddPackingComponent } from './add-packing/add-packing.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { EditPackingComponent } from './edit-packing/edit-packing.component';
import { ViewPackingComponent } from './view-packing/view-packing.component';


@NgModule({
  imports: [
    CommonModule,
    PackingRoutingModule,
    CommonModule,
    NgSelectModule,
    FormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    Ng2FlatpickrModule
  ],
  declarations: [AddPackingComponent, EditPackingComponent, ViewPackingComponent]
})
export class PackingModule { }
