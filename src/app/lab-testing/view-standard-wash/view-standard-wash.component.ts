import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SomeSharedService } from '../../globals/globals.component';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-view-standard-wash',
  templateUrl: './view-standard-wash.component.html',
  styleUrls: ['./view-standard-wash.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewStandardWashComponent implements OnInit {
  private readonly notifier: NotifierService;

  hidden: boolean = false;
  dtOptions:any={};

  wash_detail_standard_wash=[];
  fabric_=[];
  showTable:boolean=true;
  start_date: any;
  end_date: any;
  fabric_code='';


  constructor(private http: HttpClient, notifierService: NotifierService,private router:Router, private datePipe: DatePipe,private someSharedService: SomeSharedService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.getArticles();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
       scrollX:true,
      scrollY:400,
      paging:true,
      processing: true,
      order: ([0,'desc']),

      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [

        {
          extend:  'print',
          title: '<center><font size="12">' + 'Lab Test Report(Standard Wash)' + '</font></center>' +
                 '<table style="margin-bottom:0.00001%" class="table table-striped table-bordered table-sm row-border hover"><thead><tr style="padding-left:40%"><th style="padding-left:52%;width:30%">Tear_Strength </th><th style="padding-left:16.5%;width:23.4%">Shrinkage_Length </th><th style="padding-left:2%;width:8.6%">Stretch_Growth </th><th>Crocking_&_Rubbing </th></tr></thead></table>',
          },
        'copy',

        // 'excel',
        'pageLength',

      ],
      };
      var url = 'http://'+this.someSharedService.ip+':8088/api/LabTesting/FetchLabTestStandardWash_2_Months';
      this.showTable=false;

      return this.http.get<any>(url, {
        params: {

        }
      })
        // .pipe(map((data: any) => data))
         .subscribe(
               data => {
                 this.wash_detail_standard_wash = data['standard_wash'];

               //this.users=[];
             setTimeout(()=>{this.showTable = true}, 0);
               //}

                 console.log(data);
                 if(this.wash_detail_standard_wash.length==0){

                  //this.hidden=false;
                  this.notifier.notify('error', 'Error!!! Data not available');
                 }
                else{
                  //this.hidden=true;
                }


               },
               error => {
                   console.log("Error", error);
               }
           );
  }
  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  };

  FetchStandardWAsh(){
    var url = 'http://'+this.someSharedService.ip+':8088/api/LabTesting/FetchLabTestStandardWash';
      this.showTable=false;

      return this.http.get<any>(url, {
        params: {

          start_date:this.datePipe.transform(this.start_date,"dd-MM-yyyy"),
          end_date:this.datePipe.transform(this.end_date,"dd-MM-yyyy"),
          article:this.fabric_code

        }
      })
        // .pipe(map((data: any) => data))
         .subscribe(
               data => {
                 this.wash_detail_standard_wash = data['standard_wash'];

               //this.users=[];
             setTimeout(()=>{this.showTable = true}, 0);
               //}

                 console.log(data);
                 if(this.wash_detail_standard_wash.length==0){

                  this.hidden=false;
                  this.notifier.notify('error', 'Error!!! Data not available');
                 }
                else{
                  this.hidden=true;
                }


               },
               error => {
                   console.log("Error", error);
               }
           );
  }

  getArticles(){

    var data= new FormData();
    var url = 'http://'+this.someSharedService.ip+':8088/api/Fabrics/FetchAllArticles';
     this.showTable=false;

     return this.http.get<any>(url)
     // .pipe(map((data: any) => data))
      .subscribe(
            data => {

            this.fabric_ = data['fabric'];
            //this.users=[];
          setTimeout(()=> {this.showTable = true}, 0);
            //}

              console.log(data);

            },
            error => {
                console.log("Error", error);
            }
        );

  }

  View(){

    this.FetchStandardWAsh();
  }

}
