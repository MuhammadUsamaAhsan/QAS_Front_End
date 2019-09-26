import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccessoryComponent } from './add-accessory/add-accessory.component';
import { ViewAccessoriesComponent } from './view-accessories/view-accessories.component';
import { EditAccessoryComponent } from './edit-accessory/edit-accessory.component';

const routes: Routes = [

  { path: 'add-accessory' , component: AddAccessoryComponent },
  { path: 'view-accessories' , component: ViewAccessoriesComponent },
  { path: 'edit-accessory' , component: EditAccessoryComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrimAndSundriesRoutingModule { }
