import { GenericHeaderService } from './../../header/generic-header.service';
import { SomeSharedService } from './../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { HttpModule } from '@angular/http';

import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-edit-packing',
  templateUrl: './edit-packing.component.html',
  styleUrls: ['./edit-packing.component.scss'],
  providers: [SomeSharedService,GenericHeaderService]
})
export class EditPackingComponent implements OnInit {
  private readonly notifier: NotifierService;
  loading:boolean = false;
  date:any='';
  supplier_fabric_order_id:any;
  quantity:any;
  units:any=[];
  shifts:any=[];
  lines:any=[];
  header_details:any=[];
  packing_details:any=[];
  supp_orders:any=[];
  generic_header_id:any;
  binding_date:any='';
  user_id:any;
  user_name:any='';
  id:any;


  type:any='';
  unit_id:any;

  constructor(private http: HttpClient,private route: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, notifierService: NotifierService, private someSharedService: SomeSharedService,private header:GenericHeaderService) {
    this.notifier = notifierService;
  }

 async ngOnInit() {

    this.user_id=this.authenticationService.GetUserId();
    this.user_name=this.authenticationService.GetUsername().replace(/"/g,'');

    this.id = this.route.snapshot.params["id"];
    this.generic_header_id = this.route.snapshot.params["generic_header_id"];
    this.initiatecalls();

    this.FetchHeaderDetailById();

    console.log("id",this.id);
    console.log("header_id",this.generic_header_id);
    await this.FetchPackingDetailById();


  }

  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    defaultDate: '2019-01-01'
  };

  async initiatecalls(){
    this.lines=await this.header.GetLines();
    await this.GetOrder();
   // await this.GetLines();
    await this.GetShifts();
    await this.GetUnits();


     }

  async FetchPackingDetailById(){

    this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/ManagePacking/FetchAllManagePackingViaId';
    let params={
      id:this.id
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.packing_details=a['manage_packing'][0];


         // console.log("Role:",this.Roles);
        }
        else{
        }
      }   else{
        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }
    else
    {
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }


  }

  async FetchHeaderDetailById(){

    this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchGenericHeaderViaId';
    let params={
      id:this.generic_header_id
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.header_details=a['generic_header'][0];
          this.binding_date=a['generic_header'][0]['date'];
          console.log('date',this.binding_date);

         // console.log("Role:",this.Roles);
        }
        else{
        }
      }   else{
        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }
    else
    {
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }


   }

   async GetOrder() {

    this.loading=false;
    const url = 'http://'+this.someSharedService.ip+'/api/Roll_Detail/GetSupplierOrders';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.supp_orders=a['sup_orders'];

         // console.log("Role:",this.Roles);
        }
        else{

        }
      }   else{

        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }
    else
    {
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }
  }


  async GetUnits() {

    const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchAllUnits';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.units=a['unit_list'];


         // console.log("Role:",this.Roles);

        }
        else{


        }
      }   else{


        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }
    else
    {


     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }
  }

  async GetShifts() {

    const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchAllShift';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.shifts=a['shift_list'];


         // console.log("Role:",this.Roles);

        }
        else{


        }
      }   else{


        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }
    else
    {
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }
  }

  // async GetLines() {

  //   const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchAllLines';
  //   let params=null;

  //   let response=await this.authenticationService.send_call(url,params);

  //   if(response['data']){
  //     if(response['data']['_body']){
  //       if(response['data']['_body'].length>0)
  //       {
  //         const a=JSON.parse(response['data']['_body']);
  //         this.lines=a['line_list'];
  //        // console.log("Role:",this.Roles);

  //       }
  //       else{

  //       }
  //     }   else{


  //       //console.log("_body empty");
  //      // this.notifier.notify('error','No Data Found!!!');
  //     }

  //   }
  //   else
  //   {
  //    // console.log("error in FecthAllDepartments:","No Data Found!!!");
  //     //this.notifier.notify('error','No Data Found!!!');
  //   }
  // }
  async CheckSaveGenericHeader(){
    this.generic_header_id=await this.header.CheckSaveGenericHeader(this.header_details['unit_id'],this.header_details['shift'],this.header_details['line'],this.user_id,
    this.header_details['type'],this.datePipe.transform(this.date,"yyyy-MM-dd")
    )
if(this.generic_header_id){
  this.notifier.notify( 'success', 'Header saved successfully' );
              this.loading=false;

}
else{
  this.notifier.notify( 'warning', 'Header Not saved ' );
}

  }
  // async CheckSaveGenericHeader(){

  //   this.loading=true;


  //      const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchHeaderId';
  //      let params={
  //       unit_id:this.header_details['unit_id'],
  //       shift:this.header_details['shift'],
  //       line:this.header_details['line'],
  //       user_id:this.user_id,
  //       type:this.header_details['type'],
  //       c_by:this.user_id,
  //       date:this.datePipe.transform(this.date,"yyyy-MM-dd")
  //      };

  //      let response=await this.authenticationService.send_call(url,params);

  //      if(response['data']){
  //        if(response['data']['_body']){
  //          if(response['data']['_body'].length>0)
  //          {

  //            const a=JSON.parse(response['data']['_body']);
  //            this.generic_header_id=a['header_id'];
  //           if(a['header_id']!=0){
  //             this.notifier.notify( 'success', 'Header saved successfully' );
  //             this.loading=false;
  //            console.log("header_id", this.generic_header_id)
  //           }
  //           console.log("Role:",this.Roles);

  //          }
  //          else{
  //            console.log("error: 0 records");
  //           this.notifier.notify('error','No Data Found!!!');
  //          }
  //        }   else{
  //          console.log("_body empty");
  //         this.notifier.notify('error','No Data Found!!!');
  //        }

  //      }
  //      else
  //      {
  //       console.log("error in FecthAllDepartments:","No Data Found!!!");
  //        this.notifier.notify('error','No Data Found!!!');
  //      }
  //    }

     async UpdatePacking(){
      this.loading=true;

      const url = 'http://'+this.someSharedService.ip+'/api/ManagePacking/UpdateManagePacking';
      let params={

      id:this.id,
      supplier_fabric_order_id:this.packing_details['supplier_fabric_order_id'],
      quantity:this.packing_details['quantity'],
     // date:this.datePipe.transform(this.date,"yyyy-MM-dd"),
      cartons:this.packing_details['cartons'],
      generic_header_id:this.generic_header_id,
      user_id:this.user_id

      };

      let response=await this.authenticationService.send_call(url,params);

      if(response['data']){
        if(response['data']['_body']){
          if(response['data']['_body'].length>0)
          {
            const a=JSON.parse(response['data']['_body']);
           if(a==1){
            this.notifier.notify( 'success', 'Packing Detail is updated successfully' );
            this.loading=false;
            this.router.navigate(['/packing/view-packing']);
           }
           else{
            this.notifier.notify('error','Updation failed');
           }
           // console.log("Role:",this.Roles);

          }
          else{
            this.loading=false;
            //console.log("error: 0 records");
           // this.notifier.notify('error','No Data Found!!!');
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
