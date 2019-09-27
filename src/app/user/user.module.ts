
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

import { ViewComponent } from './view/view.component';
import { NgDatepickerModule } from 'ng2-datepicker';

import {NgxMaskModule} from 'ngx-mask';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
//import { NgxCheckboxModule } from 'ngx-checkbox';
//import { MDBBootstrapModule} from 'angular-bootstrap-md';




@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    Ng2FlatpickrModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    NgxLoadingModule.forRoot({}),
    //NgxCheckboxModule
    
    



  ],
  declarations: [AddComponent, EditComponent,  ViewComponent]
})
export class UserModule { }
