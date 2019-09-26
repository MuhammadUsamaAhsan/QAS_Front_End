import { AuthenticationService } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SomeSharedService } from '../../globals/globals.component';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-packing',
  templateUrl: './view-packing.component.html',
  styleUrls: ['./view-packing.component.scss'],
  providers: [SomeSharedService]
})
export class ViewPackingComponent implements OnInit {

  packing:any=[];
  loading:boolean=false;
  showTable:boolean=false;

  dtOptions:any={};
  constructor(private http: HttpClient, private authenticationService: AuthenticationService,private router:Router, private someSharedService: SomeSharedService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
        pageLength: 100,
        scrollY:400,
        paging:true,
        processing: true,
        //order: ([0,'desc']),

        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [

          'copy',
          'print',
          'excel',
          'pageLength',


        ],

    };

    this.GetManagePackingDetail()
  }
  async GetManagePackingDetail() {

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/ManagePacking/FetchAllManagePacking';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          this.loading=false;
          const a=JSON.parse(response['data']['_body']);
          this.packing=a['manage_packing'];
          this.showTable=true;
         // console.log("Role:",this.Roles);

        }
        else{
          this.loading=false;

        }
      }   else{
        this.loading=false;


        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }
    else
    {
      this.loading=false;
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }
  }
}
