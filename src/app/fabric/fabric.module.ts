import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricRoutingModule } from './fabric-routing.module';
import { AddFabricComponent } from './add-fabric/add-fabric.component';
import { EditFabricComponent } from './edit-fabric/edit-fabric.component';
import { ViewFabricComponent } from './view-fabric/view-fabric.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FabricRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})


  ],
  declarations: [AddFabricComponent, EditFabricComponent, ViewFabricComponent]
})
export class FabricModule { }
