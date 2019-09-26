import { ViewFabricComponent } from './view-fabric/view-fabric.component';
import { AddFabricComponent } from './add-fabric/add-fabric.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditFabricComponent } from './edit-fabric/edit-fabric.component';



const routes: Routes = [

  { path: 'add-fabric' , component: AddFabricComponent},
  { path: 'edit-fabric' , component: EditFabricComponent },
  { path: 'view-fabric' , component: ViewFabricComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricRoutingModule { }
