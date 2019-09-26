import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-add-packing',
  templateUrl: './add-packing.component.html',
  styleUrls: ['./add-packing.component.scss'],
  providers: [SomeSharedService]
})
export class AddPackingComponent implements OnInit {

  private readonly notifier: NotifierService;

  registerForm:any;
  submitted = false;
  loading:boolean = false;
  form: any;
  register
  date:any='';

  units:any=[];
  lines:any=[];
  shifts:any=[];
  supp_orders:any=[];
  line_no:any;
  unit:any;
  shift:any;
  user_name:any='';
  type:any='';
  user_id:any;
  generic_header_id:any;
  unit_id:any;
  supplier_fabric_order_id:null;
  quantity:'';
  to_check:'';

  constructor(private http: HttpClient,private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, notifierService: NotifierService, private someSharedService: SomeSharedService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.user_name=this.authenticationService.GetUsername().replace(/"/g,'');
   // console.log("username",this.user_name)
    this.user_id=this.authenticationService.GetUserId();

    // this.registerForm=new FormGroup({
    //   'supplier_fabric_order_id': new FormControl(""),
    //   'quantity': new FormControl(null),
    //   'to_check': new FormControl(null),
    // });

    this.registerForm = this.formBuilder.group({


      supplier_fabric_order_id: [null, Validators.required],
      quantity: ['', Validators.required],
      to_check: ['', Validators.required],


    });

    this.initiates_calls();


  }

 async initiates_calls(){

  await this.GetUnits();
  await this.GetShifts();
  await this.GetOrder();
  this.GetLines();

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
    console.log(this.submitted);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //this.notifier.notify('success', 'Accessory  is added successfully!!');
    // window.location.reload();
    //this.router.navigate(['/manage-rolls/view-roll']);

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

    async AddPacking(){

    this.loading=true;

    if (!this.registerForm.invalid) {

    const url = 'http://'+this.someSharedService.ip+'/api/ManagePacking/AddManagePacking';
    let params={

    supplier_fabric_order_id:this.supplier_fabric_order_id,
    quantity:this.quantity,
    cartons:this.to_check,
    user_id:this.user_id,
    generic_header_id:this.generic_header_id

    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
         if(a==1){
          this.notifier.notify( 'success', 'Packing Detail is added successfully' );
          this.loading=false;
          //this.router.navigate(['/packing/view-packing']);
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
   // this.notifier.notify('error','Data not inserted ');
  }
     }


}
