import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRollsRoutingModule } from './manage-rolls-routing.module';
import { AddRollComponent } from '../manage-rolls/add-roll/add-roll.component';
import { EditRollComponent } from '../manage-rolls/edit-roll/edit-roll.component';
import { ViewRollComponent } from '../manage-rolls/view-roll/view-roll.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    ManageRollsRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    NgxLoadingModule.forRoot({})


  ],
  declarations: [AddRollComponent, EditRollComponent, ViewRollComponent]
})
export class ManageRollsModule { }
