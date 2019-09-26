import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimAndSundriesRoutingModule } from './trim-and-sundries-routing.module';
import { AddAccessoryComponent } from './add-accessory/add-accessory.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ViewAccessoriesComponent } from './view-accessories/view-accessories.component';
import { EditAccessoryComponent } from './edit-accessory/edit-accessory.component';


@NgModule({
  imports: [
    CommonModule,
    TrimAndSundriesRoutingModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  declarations: [AddAccessoryComponent, ViewAccessoriesComponent, EditAccessoryComponent]
})
export class TrimAndSundriesModule { }
