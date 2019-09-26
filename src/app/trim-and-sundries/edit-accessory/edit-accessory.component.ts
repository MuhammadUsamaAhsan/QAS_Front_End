import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-edit-accessory',
  templateUrl: './edit-accessory.component.html',
  styleUrls: ['./edit-accessory.component.scss'],
  providers: [SomeSharedService]
})
export class EditAccessoryComponent implements OnInit {
  private readonly notifier: NotifierService;

  registerForm: FormGroup;
  submitted = false;
  loading:boolean = false;
  form: any;
  register
  date:any='';
  acc_supplier:any='';
  nomination_local:any='';
  remarks:any='';
  uom:any='';
  customers:any=[];
  supp_orders:any=[];
  suppliers:any=[];
  customer_id:any;
  supplier_fabric_order_id:any;
  accessory_id:any;
  quantity:any;

  units:any=[];
  shifts:any=[];
  lines:any=[];
  accessories:any=[];
  accessories_detail:any=[];
  header_details:any=[];

  line_no:any;
  unit:any;
  shift:any;

  user_name:any='';
  type:any='';
  wash_type:any='';
  supplier_type:any='';
  unit_id:any;
  user_id:any;
  item_id:any;
  id:any;
  supplier_id:any;
  generic_header_id:any;
  binding_date:any='';

  constructor(private http: HttpClient,private route: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, notifierService: NotifierService, private someSharedService: SomeSharedService) {
    this.notifier = notifierService;
  }

 async ngOnInit() {

  this.user_id=this.authenticationService.GetUserId();
  this.user_name=this.authenticationService.GetUsername().replace(/"/g,'');

    this.id = this.route.snapshot.params["id"];
    this.generic_header_id = this.route.snapshot.params["generic_header_id"];

    console.log("id",this.id);
    console.log("header_id",this.generic_header_id);

  await  this.FetchManageAccessoryById();
  await  this.FetchHeaderDetailById();
         this.initiatecalls();
  }

  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    defaultDate: '2019-01-01'
  };



  async initiatecalls(){
    await this.getCustomers();
    await this.GetOrder();
    await this.GetLines();
    await this.GetShifts();
    await this.GetUnits();

    //await this.GetAccessories();
    this.GetSuppliers();

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

  async getCustomers() {

    //this.loading=true;

     const url = 'http://'+this.someSharedService.ip+'/api/Users/FetchAllCustomers';
     let params=null;

     let response=await this.authenticationService.send_call(url,params);

     if(response['data']){
       if(response['data']['_body']){
         if(response['data']['_body'].length>0)
         {
           const a=JSON.parse(response['data']['_body']);
           this.customers=a['customers'];


          // console.log("Role:",this.Roles);

         }
         else{


        }

       }
         else{


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

    // this.loading=false;
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

   async CheckSaveGenericHeader(){

   // this.loading=true;


      const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchHeaderId';
      let params={
        unit_id:this.header_details['unit_id'],
        shift:this.header_details['shift'],
        line:this.header_details['line'],
        user_id:this.user_id,
        type:this.header_details['type'],
        //c_by:this.user_id,
        date:this.datePipe.transform(this.date,"yyyy-MM-dd")
      };

      let response=await this.authenticationService.send_call(url,params);

      if(response['data']){
        if(response['data']['_body']){
          if(response['data']['_body'].length>0)
          {

            const a=JSON.parse(response['data']['_body']);
            this.generic_header_id=a['header_id'];
           if(a['header_id']!=0){
             this.notifier.notify( 'success', 'Header saved successfully' );
             this.loading=false;
            console.log("header_id", this.generic_header_id)
           }
           // console.log("Role:",this.Roles);

          }
          else{
            //console.log("error: 0 records");
           // this.notifier.notify('error','No Data Found!!!');
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
          this.loading=false;

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

  async GetLines() {

    const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchAllLines';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.lines=a['line_list'];
         // console.log("Role:",this.Roles);
       //  this.loading=false;

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

  async GetSuppliers() {

    this.supplier_type='Accessories';

    const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/FetchAllSuppliers';
    let params={
      supplier_type:this.supplier_type
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.suppliers=a['suppliers'];
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

  async GetAccessories() {




    const url = 'http://'+this.someSharedService.ip+'/api/Accessories/FetchAllAccessories';
    let params={
      wash_type:this.wash_type
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
         // this.loading=false;
          const a=JSON.parse(response['data']['_body']);
          this.accessories=a['accessories_list'];
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




  async FetchManageAccessoryById(){

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Accessories/FetchManageAccessoriesViaId';
    let params={
      id:this.id
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.accessories_detail=a['accessories_list'][0];

          this.wash_type=a['accessories_list'][0]['type'];
          this.GetAccessories();

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

  async UpdateAccessoryDetail(){

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Accessories/UpdateManageAccessories';
    let params={

    id:this.id,
    supplier_fabric_order_id:this.accessories_detail['supplier_fabric_order_id'],
    local_nomination:this.accessories_detail['local_nomination'],
    supplier_id:this.accessories_detail['supplier_id'],
    uom:this.accessories_detail['uom'],
    accessory_id:this.accessories_detail['accessory_id'],
    quantity:this.accessories_detail['quantity'],
   // date:this.datePipe.transform(this.date,"yyyy-MM-dd"),
    remarks:this.accessories_detail['remarks'],
    type:this.accessories_detail['type'],
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
          this.notifier.notify( 'success', 'Accessory Detail is updated successfully' );
          this.loading=false;
          this.router.navigate(['/trim-and-sundries/view-accessories']);
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
