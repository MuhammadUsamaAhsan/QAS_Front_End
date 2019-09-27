import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';
import { GenericHeaderService } from './../../header/generic-header.service';

@Component({
  selector: 'app-add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.scss'],
  providers: [SomeSharedService,GenericHeaderService]
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

  line_no:any='';
  unit:any='';
  shift:any='';

  user_name:any='';
  type:any='';
  wash_type:any='';
  supplier_type:any='';
  unit_id:any;
  user_id:any;
  item_id:any;
  supplier_id:any;
  generic_header_id:any;

  hidden:boolean=true;


  constructor(private http: HttpClient,private header:GenericHeaderService,private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, notifierService: NotifierService, private someSharedService: SomeSharedService) {
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

  this.loading=true;

  this.customers=await this.header.getCustomers();
  this.lines=await this.header.GetLines();
  this.shifts=await this.header.GetShifts();
  this.units=await this.header.GetUnits();
  this.supp_orders=await this.header.GetOrder();
  this.suppliers=await this.header.GetSuppliers();

  this.loading=false;


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

  }

  async GetAccessories(wash_type:any){

    this.accessories=await this.header.GetAccessories(wash_type);
  }


   async CheckSaveGenericHeader(){

    this.loading=true;
    if(this.shift=='' && this.line_no=='' && this.shift==''  && this.date==''){
      this.notifier.notify('error','Please select all fields to save header');
      this.loading=false;
    }
    else{
      this.generic_header_id=await this.header.CheckSaveGenericHeader(this.unit_id,this.shift,this.line_no,this.user_id,this.type,this.date);

      if(!isNaN(this.generic_header_id ) && this.generic_header_id!=0){
            this.notifier.notify( 'success', 'Header saved successfully' );
            this.loading=false;
            this.hidden=false;
            console.log("header_id", this.generic_header_id)
        }
        else {
               this.notifier.notify('error','Header not saved,check server');
               this.loading=false;
              }

    }

    }

    async AddAccessoryAndView(){

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
      this.notifier.notify('error','please select all required fields ');
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
          this.registerForm.reset();
          this.ClearFields();

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
    this.notifier.notify('error','please select all required fields ');
  }
}

ClearFields(){
this.supplier_fabric_order_id='';
this.nomination_local='';
this.type='';
this.quantity='';
this.uom='';
this.remarks='';
this.accessory_id='';
this.supplier_id='';

}


}
