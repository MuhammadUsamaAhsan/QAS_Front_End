import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.scss'],
  providers: [SomeSharedService]
})
export class AddAccessoryComponent implements OnInit {

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
  supplier_id:any;
  generic_header_id:any;


  constructor(private http: HttpClient,private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, notifierService: NotifierService, private someSharedService: SomeSharedService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.user_name=this.authenticationService.GetUsername().replace(/"/g,'');
   // console.log("username",this.user_name)
    this.user_id=this.authenticationService.GetUserId();

    this.registerForm = this.formBuilder.group({

      supplier_fabric_order_id: ['', Validators.required],
      nomination_local: ['', Validators.required],
      supplier_id: ['', Validators.required],
     // customer_id: ['', Validators.required],
      uom: ['', Validators.required],
      accessory_id: ['', Validators.required],//packing list id
      quantity: ['', Validators.required],
      remarks: ['', Validators.required],
      wash_type: ['', Validators.required],
     // generic_header_id: ['', [Validators.required]]
    });




    this.initiatecalls();

  }

 async initiatecalls(){

 await this.getCustomers();
 await this.GetOrder();
 await this.GetUnits();
 await this.GetShifts();
 await this.GetLines();

 //await this.GetAccessories();
 this.GetSuppliers();

  }

  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  };


  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //this.notifier.notify('success', 'Accessory  is added successfully!!');
    // window.location.reload();
    //this.router.navigate(['/manage-rolls/view-roll']);

  }

  async getCustomers() {

    this.loading=true;

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

   async CheckSaveGenericHeader(){

   // this.loading=true;


      const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchHeaderId';
      let params={
        unit_id:this.unit_id,
        shift:this.shift,
        line:this.line_no,
        user_id:this.user_id,
        type:this.type,
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
          this.loading=false;
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


  async AddAccessory(){


    this.loading=true;

    if (!this.registerForm.invalid) {

    const url = 'http://'+this.someSharedService.ip+'/api/Accessories/AddManageAccessories';
    let params={

    supplier_fabric_order_id:this.supplier_fabric_order_id,
    local_nomination:this.nomination_local,
    supplier_id:this.supplier_id,
    uom:this.uom,
    accessory_id:this.accessory_id,
    quantity:this.quantity,
   // date:this.datePipe.transform(this.date,"yyyy-MM-dd"),
    remarks:this.remarks,
    type:this.wash_type,
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
          this.notifier.notify( 'success', 'Accessory Detail is added successfully' );
          this.loading=false;
          this.router.navigate(['/trim-and-sundries/view-accessories']);
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

  else{
    this.loading=false;
    this.notifier.notify('error','Data not inserted ');
  }
}


}
