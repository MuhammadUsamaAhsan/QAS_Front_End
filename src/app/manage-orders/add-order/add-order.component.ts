import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ViewChild, ElementRef } from '@angular/core';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [SomeSharedService]
})
export class AddOrderComponent implements OnInit {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal1') closeAddExpenseModal1: ElementRef;

  private readonly notifier: NotifierService;

  supplier_id = null;
  order_id = null;
  fabric_id = null;
  quantity = null;
  packing_list_id = null;
  average_points = null;
  customer = '';
  a_grade_qty = null;
  b_grade_qty = null;
  cuttable_width_standard = null;
  remarks = '';
  fabric = null;

  registerForm: FormGroup;
  submitted = false;
  form: any;
  register;


  title = 'app';


  fabrics = [];
  newfabrics = [];
  neworder = [];
  orders = [];
  suppliers = [];
  orders_list = [];

  showTable: boolean = true;
  fabric_code = '';
  fabric_code1 = '';
  orders_no1 = '';
  order_no = '';
  supplier_type :any = '';
  name = '';
  customers = [];
  customer_id = null;
  loading:boolean=false;

  constructor(private http: HttpClient,private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, notifierService: NotifierService, private someSharedService: SomeSharedService) {
    this.notifier = notifierService;

  }
  ngOnInit() {

    this.initiates_calls();

    this.registerForm = this.formBuilder.group({


      fabric_id: ['', Validators.required],
      order_id: ['', Validators.required],
      supplier_id: ['', Validators.required],
      quantity: ['', Validators.required],
      packing_list_id: ['', Validators.required],//packing list id
      average_points: ['', Validators.required],
      // average_miss_4_points:['', Validators],
      a_grade_qty: ['', Validators.required],
      b_grade_qty: ['', Validators.required],
      remarks: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
      cuttable_width_standard: ['', [Validators.required]],



    });

  }

  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      this.notifier.notify('success', 'New Order is added successfully!!');
    }
  }
 async initiates_calls(){

 await this.getFabric();
 await this.getOrder();
 await this.getSupplier();
 await this.getCustomers();
  }

 async AddNewOrder() {


    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Orders/AddOrder';
    let params={

      order_no: this.orders_no1
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
         // this.UserRoles=a['userType'];
         if(a==1){
           //console.log(a);
           this.notifier.notify( 'success', 'New order is added successfully' );
           this.loading=false;
           this.closeAddExpenseModal1.nativeElement.click();
           this.orders_list = [];
           this.getOrder();

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
}
  // fabric_code1 = "abc";

 async AddNewFabric() {



    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/AddFabric';
    let params={

        supplier_id: this.supplier_id,
        fabric: this.fabric_code1
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
         // this.UserRoles=a['userType'];
         if(a==1){
           //console.log(a);
           this.notifier.notify('success', 'New Article is added successfully!!');
           this.closeAddExpenseModal.nativeElement.click();
           this.loading=false;

           this.fabrics = [];
           this.getFabric();


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
}

async  getFabric() {

    this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchAllFabrics';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.fabrics=a['fabrics'];

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



 async getOrder() {

   // this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Orders/FetchAllOrder';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.orders_list=a['order_list'];

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

   // this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Users/FetchAllCustomers';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.customers=a['customers'];
          this.loading=false;

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

 async getSupplier() {

  this.supplier_type='Fabric'
   // this.loading=true;
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

 async addOrder() {

  this.loading=true;

    if (!this.registerForm.invalid) {


     // this.loading=true;

      const url = 'http://'+this.someSharedService.ip+'/api/Orders/AddSupplierOrder';
      let params={

            supplier_id: this.supplier_id,
            fabric_id: this.fabric_id,
            order_id: this.order_id,
            quantity: this.quantity,
            packing_list_id: this.packing_list_id,
            average_points: this.average_points,
            a_grade_qty: this.a_grade_qty,
            b_grade_qty: this.b_grade_qty,
            remarks: this.remarks,
            customer_id: this.customer_id,
            cuttable_width_standard: this.cuttable_width_standard
      };

      let response=await this.authenticationService.send_call(url,params);

      if(response['data']){
        if(response['data']['_body']){
          if(response['data']['_body'].length>0)
          {

            const a=JSON.parse(response['data']['_body']);
           // this.UserRoles=a['userType'];
           if(a==1){
             //console.log(a);
             this.notifier.notify( 'success', 'Supplier order is added successfully' );
             this.loading=false;
             this.router.navigate(['/manage-orders/view-order']);
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
    else {
      // alert("please Enter valid data!!!!");
    }


  }

}
}
