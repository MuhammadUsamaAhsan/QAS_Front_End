import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-view-accessories',
  templateUrl: './view-accessories.component.html',
  styleUrls: ['./view-accessories.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewAccessoriesComponent implements OnInit {

  accessories_list:any=[];
  loading:boolean=false;
  showTable:boolean=false;
  

  dtOptions:any={};
  constructor(private http: HttpClient, private authenticationService: AuthenticationService,private router:Router,private someSharedService: SomeSharedService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
        pageLength: 100,
        scrollX:true,
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

    this.GetAccessoriesDetail();
  }

  async GetAccessoriesDetail() {

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Accessories/FetchManageAccessories';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          this.loading=false;
          const a=JSON.parse(response['data']['_body']);
          this.accessories_list=a['accessories_list'];
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
