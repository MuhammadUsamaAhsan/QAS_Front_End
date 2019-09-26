import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-view-supplier-orders-monthly',
  templateUrl: './view-supplier-orders-monthly.component.html',
  styleUrls: ['./view-supplier-orders-monthly.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewSupplierOrdersMonthlyComponent implements OnInit {
   suppliers = [];
   supplier_point_score = [];
   hidden :boolean =true;
   showTable: boolean = true;
  supplier: any;
  year: any;
  month=null;
  point_score=null;
  supplier_point_score_: any;
  loading:boolean=false;
  ShowError:boolean=false;

  constructor(private http: HttpClient,private authenticationService: AuthenticationService,private router:Router,private route:ActivatedRoute,private someSharedService: SomeSharedService) {

   }

 async ngOnInit() {
  await  this.getSupplier();
   this.supplier=this.suppliers[0]['name'];
    this.year='2019';
    this.ViewChart();
  }

 async getSupplier(){

    this.loading=true;
    
    const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/FetchAllSuppliers';
    let params=null;
    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.suppliers=a['suppliers'];
          this.loading=false;
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

async ViewChart(){
  this.hidden=false;
 await   this.FetchSupplierPointScore();
    this.lineChart();
    this.barChart();

   }

async FetchSupplierPointScore(){

  this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Roll_Detail/FetchSupplierPointScoreByYear';
  let params={
    year:this.year,
    supplier:this.supplier
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.supplier_point_score=a['sps'];


        if(this.supplier_point_score.length>0){

          this.lineChart();
          this.barChart();
          this.hidden = false;
          this.loading=false;
          this.ShowError=false;
          this.showTable=true;

          }

        else{
          this.hidden = true;
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

  lineChart() {

    var i=0;
    var  label=[];
    var data=[];
    var data1=[];


    for( i=0;i<this.supplier_point_score.length;i++){

      label.push(this.supplier_point_score[i].month);
      data.push(this.supplier_point_score[i].point_score);
    }

     

    const line = new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        // labels: [this.supplier_point_score[0].month,this.supplier_point_score[1].month],
        labels: label,
        datasets: [{
          // data: [this.supplier_point_score[0].point_score,this.supplier_point_score[1].month],
          data: data,
          label: 'Supplier Point Count',
          borderColor: '#3e95cd',
          fill: false
         },


        ]
      },
      options: {

        title: {
          display: true,
          text: 'supplier Point Count'
        },

        animation: {
          duration: 1,
          onComplete: function () {
              var chartInstance = this.chart,
              ctx = chartInstance.ctx;
              ctx.textAlign = 'center';
              ctx.fillStyle = "rgba(0,0,0,1)";
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
      scales: {
        yAxes: [{
        ticks: {
          gridLines: {
            display : true
        },
        beginAtZero: true
        }
        }],
        xAxes: [{
        ticks: {
        autoSkip: false
        }
        }]
        },
        maintainAspectRatio: true,
        responsive: true
      }
    });
  }
  barChart() {
    var i=0;
    var  label=[];
    var data=[];


    for( i=0;i<this.supplier_point_score.length;i++){

      label.push(this.supplier_point_score[i].month);
      data.push(this.supplier_point_score[i].quantity);
    }


      // console.log(this.articles[0].quantity);
      const bar = new Chart(document.getElementById('bar-chart'), {
        type: 'bar',
        data: {
          labels: label,
          datasets: [
            {
              label: 'Supplier Quantity',
              backgroundColor: ['#3ebb8c', '#9092a5', '#f36b56', '#39a8d0', '#fed33d','#884EA0','#7D6608','#52BE80','#138D75','blue'],
              // data: [1234, this.top10articles[1], this.top10articles[2], this.top10articles[3], this.top10articles[4]]
              data: data

              // data: [1234,this.articles[1]['quantity'], this.articles[2]['quantity'], this.articles[3]['quantity'], this.articles[4]['quantity']
            }
          ]
        },
        options: {
          legend: { display: false },

          animation: {
            duration: 1,
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
        scales: {
          yAxes: [{
          ticks: {
          beginAtZero: true
          }
          }],
          xAxes: [{
          ticks: {
          autoSkip: false
          }
          }]
          },

          title: {
            display: true,

            text: 'Supplier Quantity'
          },
          showValue:{
          showValue: true
        },
          maintainAspectRatio: true,
          responsive: true,

        }
      });



  }




}

