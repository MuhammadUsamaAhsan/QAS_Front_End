import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SomeSharedService } from '../../globals/globals.component';
import { NotifierService } from 'angular-notifier';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-three-home-laundry',
  templateUrl: './three-home-laundry.component.html',
  styleUrls: ['./three-home-laundry.component.scss'],
  providers: [SomeSharedService]
})
export class ThreeHomeLaundryComponent implements OnInit {

  private readonly notifier: NotifierService;
  rolls = [];
  orders_ = [];
  customers = [];
  supp_orders = [];
  rollnos = [];
  id_ = null;
  gsm = null;
  ph = null;

  supplier_fabric_order_id: null;
  roll_no = '';

  quantity = null;

  cuttable_width = null;
  wash = '';

  remarks = '';
  customer = '';
  order_no = '';

  date = '';
  meters = null;
  customer_id = null;
  showTable: boolean = true;

  supplier = '';
  fabric_code = '';

  registerForm: FormGroup;
  submitted = false;
  form: any;
  register;

  crocking_rubbing_dry_min=null;
  crocking_rubbing_dry_max=null;
  crocking_rubbing_wet_max=null;
  crocking_rubbing_wet_min=null;


  options: Options = {
    floor: 0,
    ceil: 5,
    step: 1
  };
  weave: string | string[];
  shrinkage_length_warp_perc: string | string[];
  shrinkage_length_weft_perc: string | string[];
  tear_strength_warp_perc: string | string[];
  tear_strength_weft_perc: string | string[];
  stretch_growth_30_min: string | string[];
  stretch_growth_60_min: string | string[];
  prepared_by: string | string[];
  composition: string | string[];
  // composition: '';
  // weave: '';
  // shrinkage_length_warp_perc: '';
  // shrinkage_length_weft_perc: '';
  // tear_strength_warp_perc: '';
  // tear_strength_weft_perc: '';
  // stretch_growth_30_min: '';
  // stretch_growth_60_min: '';
  // prepared_by: '';

  constructor(
    private http: HttpClient, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private datePipe: DatePipe, private someSharedService: SomeSharedService, notifierService: NotifierService) {
    this.notifier = notifierService;

  }
  ngOnInit() {
    this.crocking_rubbing_dry_min=0;
    this.crocking_rubbing_dry_max=5;
    this.crocking_rubbing_wet_min=0;
    this.crocking_rubbing_dry_max=5;

    this.wash_type="three_HL";

    this.id_ = this.route.snapshot.params["id_"];
    if (this.id_ == null) {
      this.FetchAllOrders();
    }
    else {
      this.FetchSupplierOrderDetails();
      //this.FetchAllOrders();
    }

    // this.supplier=this.route.snapshot.params["supplier"];
    // this.fabric_code=this.route.snapshot.params["fabric_code"];
    // this.customer=this.route.snapshot.params["customer"];
    // this.order_no=this.route.snapshot.params["order_no"];
    // this.quantity=this.route.snapshot.params["quantity"];

    // this.supplier=this.supp_orders['supplier'][0];
    // this.fabric_code=this.supp_orders['fabric_code'][0];
    // this.customer=this.supp_orders['customer'][0];
    // this.order_no=this.supp_orders['order_no'][0];
    // this.quantity=this.supp_orders['quantity'][0];

    // this.registerForm = this.formBuilder.group({

    //   composition: ['', Validators.required],//roll#
    //   weave: ['', Validators.required],
    //   date: ['', Validators.required],
    //   customer_id: ['', Validators.required],
    //   cuttable_width: ['', Validators.required],
    //   points_score: ['', [Validators.required]],
    //   grade: ['', [Validators.required]],
    //   local_inspection_point_score: ['', [Validators.required]],
    //   remarks: ['', [Validators.required]],
    //   is_audit: ['', [Validators.required]],
    //   auditor_name: ['', [Validators.required]],


    // });
  }

  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  };

  wash_type = this.wash_type




  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.notifier.notify('success', ' Wash Test is added successfully!!');
    // window.location.reload();
    //this.router.navigate(['/lab-testing/three']);

  }

  FetchSupplierOrderDetails() {

    var url = 'http://' + this.someSharedService.ip + ':8088/api/Orders/GetSupplierOrderById';

    return (
      this.http
        .get<any>(url, {
          params: {
            id: this.id_
          }
        })
        // .pipe(map((data: any) => data))

        .subscribe(
          data => {
            this.orders_ = data['orders'][0];

            //this.users=[];
            setTimeout(() => { }, 0);
            //}

            console.log(data);
            if (this.orders_) {
              this.FetchRollNo();
            }
          },
          error => {
            console.log("Error", error);
          }
        )
    );
  }
  FetchAllOrders() {


    var data = new FormData();
    var url = 'http://' + this.someSharedService.ip + ':8088/api/Roll_Detail/GetSupplierOrders';
    this.showTable = false;

    return this.http.get<any>(url)
      // .pipe(map((data: any) => data))
      .subscribe(
        data => {

          this.supp_orders = data['sup_orders'];
          //this.users=[];
          setTimeout(() => { this.showTable = true }, 0);
          //}

          console.log(data);

        },
        error => {
          console.log("Error", error);
        }
      );
  }
  AddRecord() {

    // if (this.wash_type == "standard_wash") {
    //   this.composition = '';
    //   this.weave = '';
    //   this.ph='';
    //   this.roll_no='';
    //   this.quantity='';
    //   this.cuttable_width='';

    // }
    // else if (this.wash_type == "three_HL") {

    //   this.prepared_by = '';
    //   this.wash = '';
    // }
     var data= new FormData();
    var url = 'http://' + this.someSharedService.ip + ':8088/api/LabTesting/AddWashDetail';
    this.showTable = false;

    return this.http.get<any>(url,
       {
      params: {
        weave: this.weave,
         date: this.datePipe.transform(this.date, "dd-MM-yyyy"),
         id: this.id_,
         roll_no: this.rollnos['roll_no'],
         meters: this.quantity,
         cuttable_width: this.cuttable_width,
         gsm: this.gsm,
         wash: this.wash,
         shrinkage_length_warp_perc: this.shrinkage_length_warp_perc,
         shrinkage_length_weft_perc: this.shrinkage_length_weft_perc,
         tear_strength_warp_perc: this.tear_strength_warp_perc,
         tear_strength_weft_perc: this.tear_strength_weft_perc,
         stretch_growth_30_min: this.stretch_growth_30_min,
         stretch_growth_60_min: this.stretch_growth_60_min,
        crocking_rubbing_dry_min: this.crocking_rubbing_dry_min,
        crocking_rubbing_dry_max: this.crocking_rubbing_dry_max,
        crocking_rubbing_wet_min: this.crocking_rubbing_wet_min,
        crocking_rubbing_wet_max: this.crocking_rubbing_wet_max,
         remarks: this.remarks,
         prepared_by: this.prepared_by,
         wash_type: this.wash_type,
         composition: this.composition,
         ph:this.ph

      }
    })
      // .pipe(map((data: any) => data))
      .subscribe(
        data => {

          //this.rolls = data['rolls'];
          //this.users=[];
          setTimeout(() => { this.showTable = true }, 0);
          //}

          console.log(data);
          console.log("wash_type", this.wash_type);
          if(data){
            this.notifier.notify( 'success', 'Test Data is added successfully!!' );
            window.location.reload();
          }

        },
        error => {
          console.log("Error", error);
        }
      );

  }

  FetchRollNo() {
    // var demo=this.orders_['order_no'];

    console.log("order_no", this.id_);


    var url = 'http://' + this.someSharedService.ip + ':8088/api/LabTesting/FetchAllRollNoAgainstOrderNo';

    return (
      this.http
        .get<any>(url, {
          params: {
            order_id: this.id_
          }
        })
        // .pipe(map((data: any) => data))

        .subscribe(
          data => {
            this.rollnos = data['rolls'];

            //this.users=[];
            setTimeout(() => { }, 0);
            //}

            console.log(data);
          },
          error => {
            console.log("Error", error);
          }
        )
    );
  }
}



