import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPackingComponent } from './add-packing/add-packing.component';
import { EditPackingComponent } from './edit-packing/edit-packing.component';
import { ViewPackingComponent } from './view-packing/view-packing.component';

const routes: Routes = [

  { path: 'add-packing' , component: AddPackingComponent  },
  { path: 'edit-packing' , component: EditPackingComponent  },
  { path: 'view-packing' , component: ViewPackingComponent  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingRoutingModule { }
