import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SomeSharedService } from '../../globals/globals.component';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NotifierService } from 'angular-notifier';
//import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-three-home-laundary',
  templateUrl: './view-three-home-laundary.component.html',
  styleUrls: ['./view-three-home-laundary.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewThreeHomeLaundaryComponent implements OnInit {
  private readonly notifier: NotifierService;
  hidden: boolean = false;
  dtOptions:any={};
    start_date=null;
    end_date=null;
    wash_detail_3HL=[];
    fabric_=[];
    showTable:boolean=true;
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
      paging:false,
      processing: true,
      order: ([0,'desc']),

      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [

        {
          extend:  'print',
          title: '<center><font size="12">' + 'Lab Test Report(3HL)' + '</font></center>' +
                 '<table style="margin-bottom:0.00001%" class="table table-striped table-bordered table-sm row-border hover"><thead><tr style="padding-left:40%"><th style="padding-left:59%;width:30%">Tear_Strength </th><th style="padding-left:16.5%;width:23.4%">Shrinkage_Length </th><th style="padding-left:2%;width:8.5%">Stretch_Growth </th><th>Crocking_&_Rubbing </th></tr></thead></table>',
          },
        'copy',

        // 'excel',
        'pageLength',
        {
        extend        : 'excel',
       // messageTop:'Lab Test Report ( 3HL )',
        defaultContent: '',
        title         :  '  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  ' +'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  '+'  ' +'  '+'  '+'  '+' '+'Tear_Strength' + '   '+'  ' +'Shrinkage_Length'  +'   ' +'   '+ 'Strecth_Growth' +'   ' +'  '+  'Crocking & Rubbing',

        text          : 'Excel',
        exportOptions : {
            columns: ':visible'
        },
        somethingLikeRender : function (data, type, row, meta) {
            // EDIT CELLS...
        }},
        // {
        //   text: 'Excel',
        //   key: '1',
        //   action: function (e, dt, node, config) {
        //     {
        //       var blob = new Blob([document.getElementById("exportable").innerText], {
        //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        //           });
        //       var fileName = '3HL_Report.xls';
        //       saveAs(blob, fileName);
        //     }
        //     //alert('Button activated');
        //   }
        // }

      ],
      };
      var url = 'http://'+this.someSharedService.ip+':8088/api/LabTesting/FetchLabTest3HL2Months';
      this.showTable=false;

      return this.http.get<any>(url, {
        params: {

        }
      })
        // .pipe(map((data: any) => data))
         .subscribe(
               data => {
                 this.wash_detail_3HL = data['wash'];

               //this.users=[];
             setTimeout(()=>{this.showTable = true}, 0);
               //}

                 console.log(data);
                 if(this.wash_detail_3HL.length==0){

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

Fetch3HL(){

  var url = 'http://'+this.someSharedService.ip+':8088/api/LabTesting/FetchLabTest3HL';
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
                 this.wash_detail_3HL = data['wash'];

               //this.users=[];
             setTimeout(()=>{this.showTable = true}, 0);
               //}

                 console.log(data);
                 if(this.wash_detail_3HL.length==0){

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

//  ExportTOExcel()
//     {
//       var blob = new Blob([document.getElementById("exportable").innerText], {
//             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
//           });
//       var fileName = 'your_name.xls';
//       saveAs(blob, fileName);
//     }


  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  };

  View(){

    this.Fetch3HL();
  }


}
