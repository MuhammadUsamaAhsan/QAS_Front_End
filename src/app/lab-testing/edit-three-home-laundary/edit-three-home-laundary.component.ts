// import { Component, OnInit } from '@angular/core';
// import { Router } from "@angular/router";
// import { HttpClient } from "@angular/common/http";
// import { ActivatedRoute } from "@angular/router";
// import { DatePipe } from '@angular/common';
// import { FlatpickrOptions } from 'ng2-flatpickr';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { SomeSharedService } from '../../globals/globals.component';
// import { NotifierService } from 'angular-notifier';
// import { Options } from 'ng5-slider';

// @Component({
//   selector: 'app-edit-three-home-laundary',
//   templateUrl: './edit-three-home-laundary.component.html',
//   styleUrls: ['./edit-three-home-laundary.component.scss'],
//   providers: [SomeSharedService]
// })
// export class EditThreeHomeLaundaryComponent implements OnInit {

//   private readonly notifier: NotifierService;

//   id: null;
//   wash_type:'';
//   wash_Detail=[];
//   wash_Details=[];
//   supp_orders=[];
//   showTable:boolean=false;
//   id_ = null;
//   gsm = null;
//   ph = null;

//   supplier_fabric_order_id: null;
//   roll_no = '';

//   quantity = null;

//   cuttable_width = null;
//   wash = '';

//   remarks = '';
//   customer = '';
//   order_no = '';

//   date = '';
//   meters = null;
//   customer_id = null;

//   supplier = '';
//   fabric_code = '';

//   registerForm: FormGroup;
//   submitted = false;
//   form: any;
//   register;

//   crocking_rubbing_dry_min=null;
//   crocking_rubbing_dry_max=null;
//   crocking_rubbing_wet_max=null;
//   crocking_rubbing_wet_min=null;
//   options: Options = {
//     floor: 0,
//     ceil: 5,
//     step: 1
//   };
//   weave: string | string[];
//   shrinkage_length_warp_perc: string | string[];
//   shrinkage_length_weft_perc: string | string[];
//   tear_strength_warp_perc: string | string[];
//   tear_strength_weft_perc: string | string[];
//   stretch_growth_30_min: string | string[];
//   stretch_growth_60_min: string | string[];
//   prepared_by: string | string[];
//   composition: string | string[];


//   constructor(
//     private http: HttpClient, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private datePipe: DatePipe, private someSharedService: SomeSharedService, notifierService: NotifierService) {
//     this.notifier = notifierService;

//   }

//   ngOnInit() {

//     this.wash_type=this.route.snapshot.params['wash_type'];
//     this.id = this.route.snapshot.params['id'];

//     var url = 'http://'+this.someSharedService.ip+':8088/api/LabTesting/GetWashDetailById';


//     return this.http.get<any>(url, {
//       params: {
//         id: this.id,
//         wash_type:this.wash_type
//       }
//     })
//       // .pipe(map((data: any) => data))

//       .subscribe(
//         data => {

//           this.wash_Detail = data['wash'][0];
//           this.FetchAllOrders();
//            //this.temp_rolls = data['rolls'][0];


//           //this.users=[];
//           setTimeout(() => { }, 0);
//           //}

//           console.log(data);

//         },
//         error => {
//           console.log("Error", error);
//         }
//       );


//   }
//   inline: FlatpickrOptions = {
//     inline: true
//   };

//   date1: FlatpickrOptions = {

//     altInput: true,
//     altFormat: "F j, Y",
//     dateFormat: "Y-m-d",
//   };
//   FetchAllOrders() {


//     var data = new FormData();
//     var url = 'http://' + this.someSharedService.ip + ':8088/api/Roll_Detail/GetSupplierOrders';
//     this.showTable = false;

//     return this.http.get<any>(url)
//       // .pipe(map((data: any) => data))
//       .subscribe(
//         data => {

//           this.supp_orders = data['sup_orders'];
//           //this.users=[];
//           setTimeout(() => { this.showTable = true }, 0);
//           //}

//           console.log(data);

//         },
//         error => {
//           console.log("Error", error);
//         }
//       );
//   }
//   UpdateRecord(){
//     this.UpdateWashDetail();
//   }

//   UpdateWashDetail() {
//     var data = new FormData();
//    // this.id = this.route.snapshot.params['id'];


//     var url = 'http://'+this.someSharedService.ip+':8088/api/LabTesting/UpdateWashDetail';


//     return this.http.get<any>(url, {
//       params: {


//          supplier_fabric_order_id: this.wash_Detail[0].supplier_fabric_order_id,
//          weave: this.wash_Detail[0].weave,
//          date: this.datePipe.transform(this.wash_Detail[0].date, "dd-MM-yyyy"),
//          id: this.id,
//          roll_no: this.wash_Detail[0]['roll_no'],
//          meters: this.wash_Detail[0].quantity,
//          cuttable_width: this.wash_Detail[0].cuttable_width,
//          gsm: this.wash_Detail[0].gsm,
//          wash: this.wash_Detail[0].wash,
//          shrinkage_length_warp_perc: this.wash_Detail[0].shrinkage_length_warp_perc,
//          shrinkage_length_weft_perc: this.wash_Detail[0].shrinkage_length_weft_perc,
//          tear_strength_warp_perc: this.wash_Detail[0].tear_strength_warp_perc,
//          tear_strength_weft_perc: this.wash_Detail[0].tear_strength_weft_perc,
//          stretch_growth_30_min: this.wash_Detail[0].stretch_growth_30_min,
//          stretch_growth_60_min: this.wash_Detail[0].stretch_growth_60_min,
//         crocking_rubbing_dry_min: this.wash_Detail[0].crocking_rubbing_dry_min,
//         crocking_rubbing_dry_max: this.wash_Detail[0].crocking_rubbing_dry_max,
//         crocking_rubbing_wet_min: this.wash_Detail[0].crocking_rubbing_wet_min,
//         crocking_rubbing_wet_max: this.wash_Detail[0].crocking_rubbing_wet_max,
//          remarks: this.wash_Detail[0].remarks,
//          prepared_by: this.wash_Detail[0].prepared_by,
//          wash_type: this.wash_Detail[0].wash_type,
//          composition: this.wash_Detail[0].composition,
//          ph:this.wash_Detail[0].ph

//       }
//     })
//       // .pipe(map((data: any) => data))

//       .subscribe(
//         data => {
//           this.wash_Details = data['rolls'];

//           //this.users=[];
//           setTimeout(() => { }, 0);


//           //}


//           console.log(data);
//           // this.notifier.notify( 'success', 'Roll is Updated successfully!!' );
//           // this.router.navigate(['manage-rolls/view-roll']);


//           // this.router.navigate(['/manage-rolls/view-roll']);

//         },
//         error => {
//           console.log("Error", error);
//         }

//       );






//   }



// }
