import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-edit-roll',
  templateUrl: './edit-roll.component.html',
  styleUrls: ['./edit-roll.component.scss'],
  providers: [ SomeSharedService ]
})
export class EditRollComponent implements OnInit {
  private readonly notifier: NotifierService;

  supp_orders: any;

  id: any;
  public rolls = [];
  public customers = [];
  supplier_fabric_order_id: null;
  customer='';
  quantity : null;
  // yard : null;
  // lot : null;
  cuttable_width : null;
  points_score : null;
  grade = '';
  local_inspection_point_score : null;
  remarks = '';
  is_audit : null;
  auditor_name = '';
  date='';
  rolls_ = [];
  showTable:boolean=true;
  loading:boolean=false;

  private temp_rolls = [];

  constructor(private http: HttpClient, private router: Router,private authenticationService: AuthenticationService,private datePipe: DatePipe, private route: ActivatedRoute,notifierService: NotifierService,private someSharedService: SomeSharedService) {

    this.notifier = notifierService;
   }
   date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",  };

 async ngOnInit() {

  await  this.FetchAllOrders();
    // this.getCustomers();

    this.id = this.route.snapshot.params['id'];

    this.GetRollById();

  }

  async GetRollById(){


   // this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Roll_detail/GetRollById';
    let params={
      id: this.id
    };



    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {


          const a=JSON.parse(response['data']['_body']);
          this.rolls=a['rolls'];
          this.rolls_=a['rolls'][0];

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

  async FetchAllOrders() {

  this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Orders/FetchAllSupplierOrder';
  let params=null;



  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.supp_orders=a['orders'];

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

  // getCustomers(){


  //   var data= new FormData();
  //           var url = 'http://'+this.someSharedService.ip+':8088/api/Users/FetchAllCustomers';
  //            this.showTable=false;



  //            return this.http.get<any>(url)
  //            // .pipe(map((data: any) => data))
  //             .subscribe(
  //                   data => {

  //                   this.customers = data['customers'];
  //                   //this.users=[];
  //                 setTimeout(()=>{this.showTable = true}, 0);
  //                   //}

  //                     console.log(data);

  //                   },
  //                   error => {
  //                       console.log("Error", error);
  //                   }
  //               );



  //  }


 async updateRoll() {

    this.id = this.route.snapshot.params['id'];

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Roll_Detail/UpdateRoll';
    let params={

      id: this.id,
      supplier_fabric_order_id: this.rolls[0].supplier_fabric_order_id,
      roll_no: this.rolls[0].roll_no,
     //  customer: this.rolls[0].customer,
     //  customer_id: this.rolls[0].customer_id,
      quantity: this.rolls[0].quantity,
     // lot: this.rolls[0].lot,
     // yard: this.rolls[0].yard,
     points_score: this.rolls[0].points_score,
     grade: this.rolls[0].grade,
     cuttable_width: this.rolls[0].cuttable_width,
     local_inspection_point_score: this.rolls[0].local_inspection_point_score,
     remarks: this.rolls[0].remarks,
     is_audit: this.rolls[0].is_audit,
     auditor_name: this.rolls[0].auditor_name,
     date:this.datePipe.transform(this.rolls[0].date,"yyyy-MM-dd"),

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
           this.notifier.notify( 'success', 'Roll is updated successfully!!' );
           this.loading=false;
           this.router.navigate(['/manage-rolls/view-roll']);
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
