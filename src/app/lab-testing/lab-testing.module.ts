import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LabTestingRoutingModule } from './lab-testing-routing.module';
import { ThreeHomeLaundryComponent } from './three-home-laundry/three-home-laundry.component';
import { StandardWashComponent } from './standard-wash/standard-wash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng5SliderModule } from 'ng5-slider';
import { ViewThreeHomeLaundaryComponent } from './view-three-home-laundary/view-three-home-laundary.component';
import { ViewStandardWashComponent } from './view-standard-wash/view-standard-wash.component';
import { DataTablesModule } from 'angular-datatables';
//import { EditThreeHomeLaundaryComponent } from './edit-three-home-laundary/edit-three-home-laundary.component';
import { EditStandardWashComponent } from './edit-standard-wash/edit-standard-wash.component';


@NgModule({
  imports: [
    CommonModule,
    LabTestingRoutingModule,
    FormsModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    HttpClientModule,
    DataTablesModule
  ],
  declarations: [ThreeHomeLaundryComponent, StandardWashComponent, ViewThreeHomeLaundaryComponent, ViewStandardWashComponent, EditStandardWashComponent]
})
export class LabTestingModule { }
