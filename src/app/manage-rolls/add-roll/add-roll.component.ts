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

  selector: 'app-add-roll',
  templateUrl: './add-roll.component.html',
  styleUrls: ['./add-roll.component.scss'],
  providers: [SomeSharedService]
})
export class AddRollComponent implements OnInit {
  private readonly notifier: NotifierService;

  rolls = [];
  customers = [];

  supplier_fabric_order_id: null;
  roll_no = '';
  quantity = null;
  // yard=null;
  // lot=null;
  cuttable_width = null;
  points_score = null;
  grade = '';
  local_inspection_point_score = null;
  remarks = '';
  customer = '';
  auditor_name = '';
  date = '';
  is_audit = null;
  customer_id = null;

  registerForm: FormGroup;
  submitted = false;
  form: any;
  register

  showTable: boolean = true;
  dtOptions: DataTables.Settings = {};
  supp_orders: any;
  loading:boolean=false;

  selectItems = ['uzair', 'usama', 'ali'];

  constructor(private http: HttpClient,private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe, notifierService: NotifierService, private someSharedService: SomeSharedService) {
    this.notifier = notifierService;
  }
  ngOnInit() {

    this.FetchAllOrders();
   // this.getCustomers();

    this.registerForm = this.formBuilder.group({

      roll_no: ['', Validators.required],//roll#
      quantity: ['', Validators.required],
      supplier_fabric_order_id: ['', Validators.required],
      //customer_id: ['', Validators.required],
      cuttable_width: ['', Validators.required],
      points_score: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      local_inspection_point_score: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
      is_audit: ['', [Validators.required]],
      auditor_name: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });

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
    this.notifier.notify('success', 'New Roll is added successfully!!');
    // window.location.reload();
    this.router.navigate(['/manage-rolls/view-roll']);

  }

  // getCustomers() {


  //   var data = new FormData();
  //   var url = 'http://' + this.someSharedService.ip + ':8088/api/Users/FetchAllCustomers';
  //   this.showTable = false;

  //   return this.http.get<any>(url)
  //     // .pipe(map((data: any) => data))
  //     .subscribe(
  //       data => {

  //         this.customers = data['customers'];
  //         //this.users=[];
  //         setTimeout(() => { this.showTable = true }, 0);
  //         //}

  //         console.log(data);

  //       },
  //       error => {
  //         console.log("Error", error);
  //       }
  //     );

  // }



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

 async AddRoll() {
    this.loading=true;
    if (!this.registerForm.invalid) {



      const url = 'http://'+this.someSharedService.ip+'/api/Roll_Detail/UpdateRoll';
      let params={

        roll_no: this.roll_no,
        supplier_fabric_order_id: this.supplier_fabric_order_id,
        //customer_id:this.customer_id,
        quantity: this.quantity,
        points_score: this.points_score,
        grade: this.grade,
        cuttable_width: this.cuttable_width,
        local_inspection_point_score: this.local_inspection_point_score,
        remarks: this.remarks,
        is_audit: this.is_audit,
        auditor_name: this.auditor_name,
        date: this.datePipe.transform(this.date, "yyyy-MM-dd"),
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
    else {
      // alert("Enter Valid Data!!!");
    }
  }

  }
}
