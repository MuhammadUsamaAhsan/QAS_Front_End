import { AddRollComponent } from '../manage-rolls/add-roll/add-roll.component';
import { EditRollComponent } from '../manage-rolls/edit-roll/edit-roll.component';
import { ViewRollComponent } from '../manage-rolls/view-roll/view-roll.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: 'add-roll' , component: AddRollComponent },
  { path: 'edit-roll' , component: EditRollComponent},
  { path: 'view-roll' , component: ViewRollComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRollsRoutingModule { }
