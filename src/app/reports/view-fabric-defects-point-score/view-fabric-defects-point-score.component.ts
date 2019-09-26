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
  selector: 'app-view-fabric-defects-point-score',
  templateUrl: './view-fabric-defects-point-score.component.html',
  styleUrls: ['./view-fabric-defects-point-score.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewFabricDefectsPointScoreComponent implements OnInit {
  private readonly notifier: NotifierService;

  start_date:any;
  end_date:any;
  hidden:boolean=false;

  dtOptions:any={};
   showTable:boolean=true;
   point_counts=[];
   months=[];
   month=null;

   loading:boolean=false;
  ShowError:boolean=false;

   inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",  };

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
    //this.ViewDefectPointCountBySupplier();

    this.month = (new Date().getMonth() );
    this.ViewDefectPointCountBySupplierMonthly();

  }

  viewGraph(){

    this.ViewDefectPointCountBySupplier();
  }

async ViewDefectPointCountBySupplier(){



  this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Roll_Detail/FetchSupplierPointCount';
  let params={
    start_date:this.datePipe.transform(this.start_date,"yyyy-MM-dd"),
    end_date:this.datePipe.transform(this.end_date,"yyyy-MM-dd")
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.point_counts=a['supp_point'];


        if(this.point_counts.length>0){

          this.lineChart();
          this.hidden = true;
          this.loading=false;
          this.ShowError=false;

        }
        else{
          this.hidden = false;
          this.loading=false;
          this.ShowError=true;

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
async ViewDefectPointCountBySupplierMonthly(){



  this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Roll_Detail/FetchSupplierPointCountMonthly';
  let params={
    month:this.month
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.point_counts=a['supp_point'];


        if(this.point_counts.length>0){

          this.lineChart();
          this.hidden = true;
          this.loading=false;
          this.ShowError=false;

        }
        else{
          this.hidden = false;
          this.loading=false;
          this.ShowError=true;

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

 lineChart() {

  var i=0;
  var  label=[];
  var data=[];


  for( i=0;i<this.point_counts.length;i++){

    label.push(this.point_counts[i].supplier);
    data.push(this.point_counts[i].point_score);
  }

    const line = new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: label,
        datasets: [{
          data: data,
          label: 'Defect Point Count',
          borderColor: '#191970',
          fill: false
         }, {
          data: [10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00],
          label: 'Threshold (10.00)',
          borderColor: '#FFA07A',
          fill: false
        },


        ]
      },
      options: {
        title: {
          display: true,
          text: 'Supplier Defect Point Count'
        },
        scales: {
          yAxes: [{
          ticks: {
          beginAtZero: true,
          suggestedMax: 12,


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
