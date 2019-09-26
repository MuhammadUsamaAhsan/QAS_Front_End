import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params } from "@angular/router";
import { NotifierService } from 'angular-notifier';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: "app-edit-order",
  templateUrl: "./edit-order.component.html",
  styleUrls: ["./edit-order.component.scss"],
  providers: [SomeSharedService]
})
export class EditOrderComponent implements OnInit {

  private readonly notifier: NotifierService;

  title = "app";

  suppliers = [];
  customers = [];
  orders_list = [];
  neworder = [];
  newfabrics = [];
  fabrics_list = [];
  suppliers_list = [];
  orders_ = [];
  order_no1 = null;
  fabric_code1 = null;

  loading:boolean=false;
  showTable: boolean = true;
  id: any;
  supplier_id: any;

  constructor(
    private http: HttpClient,private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, notifierService: NotifierService, private someSharedService: SomeSharedService) {

    this.notifier = notifierService;

  }
 async ngOnInit() {

    this.id = this.route.snapshot.params["id"];
  await  this.GetSupplierOrderById();
    this.initiates_calls();
  }
 async GetSupplierOrderById(){

  this.loading=true;


  const url = 'http://'+this.someSharedService.ip+'/api/Orders/GetSupplierOrderById';
  let params={
    id: this.id
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.orders_=a['orders'][0];

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

  async initiates_calls(){

    await this.getFabric();
    await this.getOrder();
    await this.getSupplier();
    await this.getCustomers();
     }


     async  getFabric() {


      const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchAllFabrics';
      let params=null;

      let response=await this.authenticationService.send_call(url,params);

      if(response['data']){
        if(response['data']['_body']){
          if(response['data']['_body'].length>0)
          {
            const a=JSON.parse(response['data']['_body']);
            this.fabrics_list=a['fabrics'];

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


     async getSupplier() {

      // this.loading=true;
       const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/FetchAllSuppliers';
       let params=null;

       let response=await this.authenticationService.send_call(url,params);

       if(response['data']){
         if(response['data']['_body']){
           if(response['data']['_body'].length>0)
           {
             const a=JSON.parse(response['data']['_body']);
             this.suppliers_list=a['suppliers'];

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
          // this.closeAddExpenseModal.nativeElement.click();
           this.loading=false;
           this.fabrics_list = [];
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

  async AddNewOrder() {


    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Orders/AddOrder';
    let params={

      order_no: this.order_no1
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

 async updateOrder() {

  this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Orders/UpdateSupplierOrder';
    let params={

      id: this.id,
      fabric_id: this.orders_['fabric_id'],
      order_id: this.orders_['order_id'],
      // order_id:this.orders_.order_id,
      supplier_id: this.orders_['supplier_id'],
      quantity: this.orders_['quantity'],
      packing_list_id: this.orders_['packing_list_id'],
      customer: this.orders_['customer'],
      customer_id: this.orders_['customer_id'],
      cuttable_width_standard: this.orders_['cuttable_width_standard'],
      average_points: this.orders_['average_points'],
      // average_miss_4_points: this.orders_['average_miss_4_points'],
      a_grade_qty: this.orders_['a_grade_qty'],
      b_grade_qty: this.orders_['b_grade_qty'],
      remarks: this.orders_['remarks']
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
           this.notifier.notify( 'success', 'Supplier order is updated successfully' );
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

}
}
