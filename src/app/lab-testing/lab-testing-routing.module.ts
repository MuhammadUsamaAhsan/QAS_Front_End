import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeHomeLaundryComponent } from './three-home-laundry/three-home-laundry.component';
import { StandardWashComponent } from './standard-wash/standard-wash.component';
import { ViewThreeHomeLaundaryComponent } from './view-three-home-laundary/view-three-home-laundary.component';
import { ViewStandardWashComponent } from './view-standard-wash/view-standard-wash.component';
//import { EditThreeHomeLaundaryComponent } from './edit-three-home-laundary/edit-three-home-laundary.component';
import { EditStandardWashComponent } from './edit-standard-wash/edit-standard-wash.component';

const routes: Routes = [

  { path: 'three-home-laundry' , component: ThreeHomeLaundryComponent },
  { path: 'standard-wash' , component: StandardWashComponent },
  { path: 'view-three-home-laundary' , component: ViewThreeHomeLaundaryComponent },
  { path: 'view-standard-wash' , component: ViewStandardWashComponent },
  //{ path: 'edit-three-home-laundary' , component: EditThreeHomeLaundaryComponent },
  { path: 'edit-standard-wash' , component: EditStandardWashComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabTestingRoutingModule { }
