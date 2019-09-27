import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';
import { GenericHeaderService } from './../../header/generic-header.service';

@Component({
  selector: 'app-add-packing',
  templateUrl: './add-packing.component.html',
  styleUrls: ['./add-packing.component.scss'],
  providers: [SomeSharedService,GenericHeaderService]
})
export class AddPackingComponent implements OnInit {

  private readonly notifier: NotifierService;

  registerForm:any;
  submitted = false;
  loading:boolean = false;
  hidden:boolean = true;
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

  constructor(private http: HttpClient,private header:GenericHeaderService,private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, notifierService: NotifierService, private someSharedService: SomeSharedService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.user_name=this.authenticationService.GetUsername().replace(/"/g,'');
   // console.log("username",this.user_name)
    this.user_id=this.authenticationService.GetUserId();



    this.registerForm = this.formBuilder.group({
      supplier_fabric_order_id: [null, Validators.required],
      quantity: ['', Validators.required],
      to_check: ['', Validators.required],
    });

    this.initiates_calls();

  }

 async initiates_calls(){
   this.loading=true;

  this.lines=await this.header.GetLines();
  this.shifts=await this.header.GetShifts();
  this.units=await this.header.GetUnits();
  this.supp_orders=await this.header.GetOrder();
  if(this.lines && this.shifts && this.units && this.supp_orders){
    this.loading=false;
  }
  else{
    this.notifier.notify('error','Error! Check server');
  }

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

    // this.loading=true;
    // this.generic_header_id=await this.header.CheckSaveGenericHeader(this.unit_id,this.shift,this.line_no,this.user_id,this.type,this.date);

    // if(this.generic_header_id!=0){
    //       this.notifier.notify( 'success', 'Header saved successfully' );
    //       this.loading=false;
    //       console.log("header_id", this.generic_header_id)
    //   }
    //   else{
    //          this.notifier.notify('error','Header not saved,check server');
    //        }
  }

  async AddPackingAndView(){

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
          this.router.navigate(['/packing/view-packing']);
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
         this.registerForm.reset();
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
