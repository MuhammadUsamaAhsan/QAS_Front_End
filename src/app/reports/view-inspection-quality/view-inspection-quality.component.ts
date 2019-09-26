import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';
import { SomeSharedService } from '../../globals/globals.component';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../Services/authentication.service';


@Component({
  selector: 'app-view-inspection-quality',
  templateUrl: './view-inspection-quality.component.html',
  styleUrls: ['./view-inspection-quality.component.scss'],
  providers: [SomeSharedService]
})
export class ViewInspectionQualityComponent implements OnInit {
  private readonly notifier: NotifierService;

  start_date:any;
  end_date:any;
  hidden:boolean=false;

  barchart;
  quality = [];
  average = [];
  months = [];
  dtOptions: any = {};
  showTable: boolean = true;
  showTable_: boolean = true;

  supplier: '';
  points_score_after_inspection: '';
  points_score_before_inspection: '';
  marking_efficiency = null;
  month = null;

  loading:boolean=false;
  ShowError:boolean=false;


  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",  };

  // clickMessage="this is uzairrr";
  // k(){
  //   alert(this.clickMessage);
  // }
  //dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient,private authenticationService: AuthenticationService,notifierService: NotifierService,private router:Router,private someSharedService: SomeSharedService,private datePipe: DatePipe) {
    this.notifier=notifierService;

  }
  ngOnInit() {
    this.months = [
      {id: 1, name: 'January'},
      {id: 2, name: 'February'},
      {id: 3, name: 'March'},
      {id: 4, name: 'April'},
      {id: 5, name: 'May'},
      {id: 6, name: 'June'},
      {id: 7, name: 'July'},
      {id: 8, name: 'August'},
      {id: 9, name: 'September'},
      {id: 10, name: 'October'},
      {id: 11, name: 'November'},
      {id: 12, name: 'December'},
  ];


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      scrollY: 400,
      paging: true,
      processing: true,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'pageLength'
      ],

    };

    this.ViewInspectionQuality();

    this.month = (new Date().getMonth() );

   this.InspectionQualityAverageMonthly();


  }

 async ViewInspectionQuality(){


    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/ViewInspectionQuality';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.quality=a['quality'];
         // this.loading=false;
          this.showTable_ = true;
         // console.log("Role:",this.Roles);

        }
        else{
         // this.loading=false;
          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
        //this.loading=false;
        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }
    else
    {
     // this.loading=false;
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }

  }

  printReport1() {
    this.router.navigate(['/reports/print-inspection-quality']);

  }

 async InspectionQualityAverage() {



  this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/ViewInspectionQualityAverage';
  let params={
    start_date:this.datePipe.transform(this.start_date,"dd-MM-yyyy"),
        end_date:this.datePipe.transform(this.end_date,"dd-MM-yyyy")
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.average=a['average'];


        if(this.average.length>0){

          this.barChart();
          this.hidden = true;
          this.loading=false;
          this.ShowError=false;
          this.showTable=true;



        }
        else{
          this.hidden = false;
          this.loading=false;
          this.ShowError=true;
          this.showTable=false;

          //this.notifier.notify('error', 'Error!!! Data not available');
        }

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

 async InspectionQualityAverageMonthly() {

  this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/ViewInspectionQualityAverageMonthly';
  let params={
    month:this.month
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.average=a['average'];


        if(this.average.length>0){

          this.barChart();
          this.hidden = true;
          this.loading=false;
          this.ShowError=false;
          this.showTable=true;



        }
        else{
          this.hidden = false;
          this.loading=false;
          this.ShowError=true;
          this.showTable=false;

          //this.notifier.notify('error', 'Error!!! Data not available');
        }

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
  // viewGraph(){

  //   this.InspectionQualityAverage();
  // }


  barChart() {

    var i = 0;
    var label = [];
    var data = [];


    for (i = 0; i < this.average.length; i++) {

      label.push(this.average[i].supplier);
      data.push(this.average[i].marking_efficiency);
    }

    const line = new Chart(document.getElementById('line-chart1'), {
      type: 'line',
      data: {
        labels: label,
        datasets: [{
          data: data,
          label: 'Defect Point Count',
          borderColor: '#191970',
          fill: false
         }, {
          data: [98,98,98,98,98,98,98,98,98,98,98,98,98,98,98],
          label: 'Benchmark Value (98)',
          borderColor: '#FFA07A',
          fill: false
        },


        ]
      },
      options: {
        title: {
          display: true,
          text: 'Supplier Marking Efficiency'
        },
        scales: {
          yAxes: [{
          ticks: {

          suggestedMax: 100,
          suggestedMin: 80,


          }
          }],
          xAxes: [{
          ticks: {
            maxRotation: 72,
            minRotation: 72,
            autoSkip: false
          }
          }]
          },
        animation: {
          duration: 2,
          onComplete: function () {
              var chartInstance = this.chart,
              ctx = chartInstance.ctx;
              ctx.textAlign = 'center';
              ctx.fillStyle = "rgba(143,143,143, 1)";
              ctx.textBaseline = 'bottom';

              this.data.datasets.forEach(function (dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function (bar, index) {
                     var data = dataset.data[index];
                     ctx.fillText(data, bar._model.x, bar._model.y - 5);
                  });
              });
          }
      },
        maintainAspectRatio: true,
        //responsive: true
      }
    });
  }
}



