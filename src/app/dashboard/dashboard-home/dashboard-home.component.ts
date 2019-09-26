import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';
import * as pptGen from 'pptxgenjs';
//import { Globals } from 'globals';
import { SomeSharedService } from '../../globals/globals.component';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../Services/authentication.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  providers: [ SomeSharedService ],

})

export class DashboardHomeComponent implements OnInit {

  private readonly notifier: NotifierService;


  start_date:any;
  end_date:any;
  hidden:boolean=false;

  total=null;
  articles_total=null;
  month=null;
  top10total=null;
  supplierTotal=null;

  supp = [];
  quality=[];
  count=[];
  point_counts=[];
  top10articles_=[];
  months=[];

  public   quantities=[];
  public   average=[];
  public   module_lists:any=[];
  public supplier = '';
  public fabric_code = '';
  quantity_in_meter = null;


  total_:null;
  suppliers=[];
  showTable:boolean=true;
  loading:boolean=false;

  articles = [];

  dtOptions: DataTables.Settings = {};
  top10articles: any;
  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",  };


  constructor(private http: HttpClient,private authenticationService: AuthenticationService,notifierService: NotifierService, private router: Router,private datePipe: DatePipe,private someSharedService: SomeSharedService) {
    this.notifier=notifierService;
  }

  ngOnInit() {

    // var dateFormat = require('dateformat');
    // var now = new Date();
    // var month=dateFormat(now, "m");

    this.month = (new Date().getMonth() )
    console.log("month",this.month);
    //this.month=8;

   // this.authenticationService.GetModuleList();
    this.module_lists=this.authenticationService.SetModuleRights(this.authenticationService.getToken());
    console.log("mod1",this.module_lists);

    this.months = [
      {id: 1,  name: 'January'},
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

    this.top10Monthly();
    this.FetchSupplierQuantityMonthly();
    this.viewNoOfArticlesMonthly();
    this.ViewDefectPointCountBySupplierMonthly();
    this.InspectionQualityAverageMonthly();

  };

 async top10(){

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/TopTenArticles';
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
          this.top10articles=a['top10articles'];

          if(this.top10articles.length > 0){

            //this.hidden=false;
            //this.barChart();
            this.showTable = true
            this.hidden = true;
            this.barChart();
            this.total = this.top10articles[0]['total'];
          }
          else {
            //this.notifier.notify( 'error', 'Error!!! Data not available' );
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
 async top10Monthly(){

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/TopTenArticlesMonthly';
    let params={
      month:this.month
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.top10articles=a['top10articles'];
          if(this.top10articles.length > 0){

            //this.barChart();
            this.hidden = true;
            this.barChart();
            this.showTable=true;
            this.top10total = this.top10articles[0]['total'];

          }
          else {
            //this.notifier.notify( 'error', 'Error!!! Data not available' );
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
 async top10SupplierWise(){


    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/TopTenArticlesSupplierWIse';
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
          this.top10articles_=a['top10articles_wrt_supplier'];

          if(this.top10articles_.length > 0){

            //this.hidden=false;
            //this.barChart();
            this.hidden = true;
            this.showTable=true;
           // this.barChart();
            this.articles_total = this.top10articles_[0]['total'];
          }
          else {
            this.notifier.notify( 'error', 'Error!!! Data not available' );
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
 async FetchSupplierQuantity() {


    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchSupplierQuantity';
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
          this.quantities=a['quantity'];

         
          if (this.quantities.length > 0) {
            this.hidden = true;
            this.barCharts();
            this.supplierTotal = this.quantities[0]['total'];

          }
          else {
           // this.notifier.notify('error', 'Error!!! Data not available');
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
 async FetchSupplierQuantityMonthly() {


    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchSupplierQuantityMonthly';
    let params={
      month:this.month
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.quantities=a['quantity'];

          if (this.quantities.length > 0) {
            this.hidden = true;
            this.showTable = true;
            this.barCharts();
            this.supplierTotal = this.quantities[0]['total'];

          }
          else {
           // this.notifier.notify('error', 'Error!!! Data not available');
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
 async viewNoOfArticles() {


    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/VIewNoOfArtilces';
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
          this.count=a['count'];

         
          if (this.count.length > 0) {

            this.hidden=true;
            this.barChart2();
            this.total_ = this.count[0]['total'];
            this.showTable = true;

            //this.viewNoOfArticles();
          }

          else {
            //this.notifier.notify('error', 'Error!!! Data not available');
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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

 async viewNoOfArticlesMonthly() {

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/VIewNoOfArtilcesMonthly';
    let params={
      month:this.month
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.count=a['count'];

          if (this.count.length > 0) {

            this.hidden=true;
            this.showTable=true;
            this.barChart2();
            this.total_ = this.count[0]['total'];
            this.loading=false;
          }
          else {
            this.loading=false;
           // this.notifier.notify('error', 'Error!!! Data not available');
          }

        }
        else{
          this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
 async ViewDefectPointCountBySupplier(){



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
            this.showTable = true;
          }
          else{
            //this.notifier.notify('error', 'Error!!! Data not available');
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
 async ViewDefectPointCountBySupplierMonthly(){

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
          }
          else{
            //this.notifier.notify('error', 'Error!!! Data not available');
          }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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
async  InspectionQualityAverage() {

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/ViewInspectionQualityAverage';
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
          this.average=a['average'];

          if(this.average.length>0){
            this.hidden = true;
            this.linechart1();
            this.showTable = true
            this.loading=false;
            }
            else{
              this.loading=false;
              //this.notifier.notify('error', 'Error!!! Data not available');
            }
  

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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

 async InspectionQualityAverageMonthly() {


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
            this.hidden = true;
            this.linechart1();
            }
            else{
              //this.notifier.notify('error', 'Error!!! Data not available');
            }

        }
        else{
         // this.loading=false;

          //console.log("error: 0 records");
         // this.notifier.notify('error','No Data Found!!!');
        }
      }   else{
       // this.loading=false;
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

 async ReportDashboard(){

  await  this.top10Monthly();
  await  this.FetchSupplierQuantityMonthly();
  await  this.viewNoOfArticlesMonthly();
  await  this.ViewDefectPointCountBySupplierMonthly();
    this.InspectionQualityAverageMonthly();
  }
 async viewGraph(){

  await  this.top10();
  await  this.FetchSupplierQuantity();
  await  this.InspectionQualityAverage();
  await  this.ViewDefectPointCountBySupplier();
    this.viewNoOfArticles();
  }

  temp_datasets :any[];
  temp_datasets1 :any[];
  temp_datasets2 :any[];
  temp_datasets3 :any[];
  temp_datasets4 :any[];

  barChart() {

    var i=0;
    var  label=[];
    var data=[];


    for( i=0;i<this.top10articles.length;i++){

      label.push(this.top10articles[i].fabric_code);
      data.push(this.top10articles[i].quantity);
    }

    this.temp_datasets = [ {

      name:'TOP  10  ARTICLES',
      labels: label,
      //chartColors: ['#3ebb8c', '#9092a5', '#f36b56', '#39a8d0', '#fed33d','#884EA0','#7D6608','#52BE80','#138D75','blue'],
       values: data

    }];


      // console.log(this.articles[0].quantity);
      const bar = new Chart(document.getElementById('bar-chart'), {
        type: 'bar',
        data: {
          labels: label,
          datasets: [
            {
              label: 'top10articles(top 10)',
              backgroundColor: ['#3ebb8c', '#9092a5', '#f36b56', '#39a8d0', '#fed33d','#884EA0','#7D6608','#52BE80','#138D75','blue'],
              // data: [1234, this.top10articles[1], this.top10articles[2], this.top10articles[3], this.top10articles[4]]
              data: data


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
            display: true,
            ticks: {
              // minimum will be 0, unless there is a lower value.
              beginAtZero: false,
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

          title: {
            display: true,

            text: 'top 10 Articles'
          },
          showValue:{
          showValue: true
        },
          maintainAspectRatio: true,
          responsive: true,

        }
      });

  }

  barCharts(){

    var i=0;
    var  label=[];
    var data=[];


    for( i=0;i<this.quantities.length;i++){

      label.push(this.quantities[i].supplier);
      data.push(this.quantities[i].quantity);
    }


    this.temp_datasets1 = [ {
      name  : '  Supplier wise Articles  ',
      labels: label,
      values: data


    }];

           // console.log("dta",this.quantities[0].supplier);

                const bar = new Chart(document.getElementById('bar-charts'), {
                  type: 'bar',
                  data: {
                    labels: label,
                    datasets: [
                      {
                        label: 'Articles(quantity_supplier_wise)',
                        backgroundColor: ['#2E86C1', '#FFC600','#138D75','purple','#F36B56','#CD853F','yellow','#2E86C1', '#FFC600','#138D75','#F36B56','#7D6608','#52BE80','#138D75','blue','#8397B3','#baa87a','#fed33d'],


                        data: data


                      }
                    ]
                  },
                  options: {
                    legend: { display: false },
                    scales: {
                      yAxes: [{
                        display: true,
                        ticks: {
                          // minimum will be 0, unless there is a lower value.
                          beginAtZero: false,
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
                    title: {
                      display: true,
                      text: 'Supplier wise Fabric Summary',

                    },
                    maintainAspectRatio: true,
                    responsive: true
                  }
                });

  }


  barChart1() {

    var i=0;
    var  label=[];
    var data=[];


    for( i=0;i<this.average.length;i++){

      label.push(this.average[i].supplier);
      data.push(this.average[i].marking_efficiency);
    }

    this.temp_datasets2 = [

      {

      name  : '  Marking Efficiency ',
      labels: label,
      values: data
    },

  ];

    const bar = new Chart(document.getElementById('bar-chart2'), {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Marking Efficiency ',
            backgroundColor: ['#39a8d0', '#7D6608','#9092a5','#fed33d', '#138D75','purple','#2E86C1', '#FFC600','#138D75','#F36B56','#CD853F','#8397B3','#baa87a','#fed33d','#2E86C1','#8397B3','#baa87a','#fed33d','green'],

            // data: [1234, this.articles[1], this.articles[2], this.articles[3], this.articles[4]]
            data: data

              },

        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              // minimum will be 0, unless there is a lower value.
             //beginAtZero: false,
              SuggestedMax:100
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
        title: {
          display: true,
          text: 'Marking Efficiency   %'
        },
       maintainAspectRatio: true,
       responsive: true
      }
    });

  }

  barChart2() {
      this.barChart2==null;
    var i=0;
    var  label=[];
    var data=[];


    for( i=0;i<this.count.length;i++){

      label.push(this.count[i].supplier);
      data.push(this.count[i].no_of_articles);
    }

    this.temp_datasets3=[

      {

        name  : '  No of Articles by Supplier ',
        labels: label,
        values: data

    },
  ];

    const bar = new Chart(document.getElementById('bar-chart3'), {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'count  ',
            backgroundColor: ['#39a8d0', '#7D6608','#9092a5','#fed33d', '#138D75','#f36b56','#FE8000','#3E8000','#015680','#7E0000','#CD853F','purple','#2E86C1','#8397B3','#baa87a','#fed33d','green'],
            data: data

           // data: [1234,this.articles[1]['quantity'], this.articles[2]['quantity'], this.articles[3]['quantity'], this.articles[4]['quantity']
          },

        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              // minimum will be 0, unless there is a lower value.
              beginAtZero: false,
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
          duration: 0,
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
        title: {
          display: true,
          text: 'No of Articles by Supplier'
        },
        maintainAspectRatio: true,
        responsive: true
      }
    });

  }

  linechart1(){
    var i=0;
    var  label=[];
    var data=[];




    for( i=0;i<this.average.length;i++){

      label.push(this.average[i].supplier);
      data.push(this.average[i].marking_efficiency);
    }

    this.temp_datasets2=[

      {

        name  : ' Supplier Marking Efficiency ',
        labels: label,
        values: data

    },
  //   {

  //     name  : ' Threshold value (10) ',
  //     labels: ' Threshold value (10) ',
  //     values: [10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,,10.00,10.00,10.00],


  // },
  ];

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



   lineChart() {

    var i=0;
    var  label=[];
    var data=[];




    for( i=0;i<this.point_counts.length;i++){

      label.push(this.point_counts[i].supplier);
      data.push(this.point_counts[i].point_score);
    }


    this.temp_datasets4=[

      {

        name  : ' Supplier Defect Point Count ',
        labels: label,
        values: data

    },
  //   {

  //     name  : ' Threshold value (10) ',
  //     labels: ' Threshold value (10) ',
  //     values: [10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00,,10.00,10.00,10.00],


  // },
  ];

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





  click(){

    var code='';
    var supp_='';
    var quan='';
    var quan_='';
    var per='';
    var per_='';
    var supp1='';
    var quan1='';


    var topten = [ ['Articles', 'Meters', 'perc(%)']];
    var sup = [ ['Supplier', 'Meters', 'perc(%) ']];
    var no_articles = [ ['Supplier', 'No of Articles']];

    for (var i=0;i<this.top10articles.length;i++){
      code = this.top10articles[i].fabric_code;//articles
      quan = this.top10articles[i].quantity;
      per = this.top10articles[i].perc;
      topten.push([code , quan, per]);

    }

    topten.push( ['Total',this.top10articles[0]['total'],'  '] );

    for (var i=0;i<this.quantities.length;i++){
      supp_ = this.quantities[i].supplier;//suppliers
      quan_ = this.quantities[i].quantity;
      per_ = this.quantities[i].perc;
      sup.push([supp_ , quan_, per_]);
    }
    sup.push( ['Total',this.quantities[0]['total'],'  '] );

    for (var i=0;i<this.count.length;i++){
      supp1 = this.count[i].supplier;//suppliers
      quan1 = this.count[i].no_of_articles;

      no_articles.push([supp1 , quan1]);
    }
    no_articles.push( ['Total',this.count[0]['total'],'  '] );


    console.log(sup,topten,no_articles);


          var pptx = new pptGen();



           var slide = pptx.addNewSlide();
          //  slide.addImage({ path:'../../../assets/stylers_logo.png',x:7, y:0, w:3.0, h:1,rounding:true });
          //   slide.addText('Top  10  Fabric Articles', {x:'16%', y:'0.5%', w:'50%' , h:'15%',bold:true,  color:{color:'ff0000',fontFace:'Tahoma'}} );
          //   slide.addChart(pptx.charts.BAR, this.temp_datasets, {  x:0, y:1, w:'55%' ,options:{fontSize:6}, h:5,label:{dataLabelPosition	:'t'},showValue:true,valueSize:8,border:{pt:'1', color:'808080'},showLegend:false,legendPos:'b', title:{title:'TOP10ARTICLES'}, chartColors:['3EBB8C', '9092A5', 'F36B56', '39A8D0', 'FED33D','884EA0','7D6608','52BE80','138D75','0000FF'] });
          //   slide.addTable( topten, { x:6.8, y:1.1, w:3,h:5.5,rowH:0.1, align:'r',showDataTable:true, fill:'ffffff', color:'696969' } );

          //slide.addTable( rows, { x:0.5, y:1.0, w:9.0, color:'363636' } );
          slide.addChart(pptx.charts.PIE, this.temp_datasets,{ showValue:true,serAxisLabelPos: 'low' });


           var slide1 = pptx.addNewSlide();
           slide1.addImage({ path:'../../../assets/stylers_logo.png',x:7, y:0, w:3.0, h:1,rounding:true });
           slide1.addText(' Supplier wise Articles', {x:'16%', y:'0.5%', w:'50%' , h:'15%',bold:true,  color:{color:'ff0000',fontFace:'Tahoma'}} );
            slide1.addChart(pptx.charts.BAR, this.temp_datasets1, { x:'37%', y:1, w:'55%' ,options:{fontSize:6},showValue:true, h:5,border:{pt:'1', color:'808080'},showLegend:false,legendPos:'b', chartColorsOpacity:{chartColorsOpacity:100}, chartColors:['2E86C1', 'FFC600', '138D75', '800080','F36B56','CD853F'] });
            slide1.addTable( sup, { x:6.8, y:1.1, w:3,h:6,rowH:0.05, align:'r',showDataTable:true, fill:'ffffff', color:'696969' } );

            var slide2 = pptx.addNewSlide();
            slide2.addImage({ path:'../../../assets/stylers_logo.png',x:7, y:0, w:3.0, h:1,rounding:true });
            slide2.addText('No of Articles by Supplier', {x:'29%', y:'0.5%', w:'60%' , h:'15%',bold:true,  color:{color:'ff0000',fontFace:'Tahoma'}} );
            slide2.addChart(pptx.charts.BAR, this.temp_datasets3, { x:'37%', y:1, w:'56%' ,options:{fontSize:6},showValue:true, h:4.5,border:{pt:'1', color:'808080'},showLegend:false,legendPos:'b', chartColors:['39A8D0', '7D6608','9092A5','FED33D','138D75','F36B56'] });
            slide2.addTable( no_articles, { x:6.8, y:1.1, w:3,h:6,rowH:0.1, align:'r',showDataTable:true, fill:'ffffff', color:'696969' } );


            var slide3 = pptx.addNewSlide();
            slide3.addImage({ path:'../../../assets/stylers_logo.png',x:7, y:0, w:3.0, h:1,rounding:true });
            slide3.addText('Marking Efficiency  % ', {x:'29%', y:'0.5%', w:'60%' , h:'15%',bold:true,  color:{color:'ff0000'}} );
            slide3.addChart(pptx.charts.LINE, this.temp_datasets2, { x:1.2, y:0.3, w:'75%' ,showValue:true, h:4.5,border:{pt:'1', color:'808080'},showPercent:true,showLegend:false,legendPos:'b' });

            var slide4 = pptx.addNewSlide();
            slide4.addImage({ path:'../../../assets/stylers_logo.png',x:7, y:0, w:3.0, h:1,rounding:true });
            slide4.addText('Supplier Defect Point Count ', {x:'29%', y:'0.3%', w:'60%' , h:'12%',bold:true,  color:{color:'ff0000'}} );
            slide4.addChart(pptx.charts.LINE, this.temp_datasets4, { x:1.2, y:0.3, w:'75%' ,showValue:true, h:4.5,border:{pt:'1', color:'808080'},showPercent:true,showLegend:false,legendPos:'b' });


       pptx.save('Fabric Reports charts');


  }

}
