import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-view-fabric-article',
  templateUrl: './view-fabric-article.component.html',
  styleUrls: ['./view-fabric-article.component.scss'],
  providers: [SomeSharedService]
})
export class ViewFabricArticleComponent implements OnInit {
  private readonly notifier: NotifierService;

  bar;
  fabrics = [];
  months = [];
  start_date: any;
  end_date: any;
  hidden: boolean = false;

  supplier = '';
  no_of_articles = null;
  month = null;
  count = [];
  showTable: boolean = true;
  loading:boolean=false;
  ShowError:boolean=false;

  dtOptions: any = {};
  total: any;


  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  };



  constructor(private http: HttpClient,private authenticationService: AuthenticationService, notifierService: NotifierService, private router: Router, private datePipe: DatePipe, private someSharedService: SomeSharedService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.FetchAllFabrics();
     this.barChart();

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

  this.month = (new Date().getMonth() );
  this.viewNoOfArticlesMonthly();


    this.dtOptions = {
      pagingType: 'full_numbers',

      pageLength: 100,
      // scrollX:true,
      scrollY: 400,
      paging: true,
      processing: true,
      order: ([0, 'desc']),
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [

        'copy',
        'print',
        'excel',
        'pageLength'



      ],

    };

  }

 async FetchAllFabrics() {


    this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchAllFabric';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.fabrics=a['fabric'];
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

  viewGraph() {

    this.viewNoOfArticles();
    //this.hidden=true;
  }

 async viewNoOfArticles() {

    this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/VIewNoOfArtilces';
    let params={

      start_date: this.datePipe.transform(this.start_date, "yyyy-MM-dd"),
      end_date: this.datePipe.transform(this.end_date, "yyyy-MM-dd")
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.count=a['count'];

          //this.barChart();

          if (this.count.length != 0) {
            this.loading=false;
            this.hidden=true;
            this.barChart();
            this.ShowError=false;
            this.total = this.count[0]['total'];
          }
          else {
            this.loading=false;
            this.hidden=false;
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

 async viewNoOfArticlesMonthly() {

    this.loading=true;
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

          //this.barChart();

          if (this.count.length != 0) {
            this.loading=false;
            this.hidden=true;
            this.barChart();
            this.ShowError=false;
            this.total = this.count[0]['total'];
          }
          else {
            this.loading=false;
            this.hidden=false;
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

  viewbarchart() {

    this.barChart();
  }

  barChart(){



    var i = 0;
    var label = [];
    var data = [];


    for (i = 0; i < this.count.length; i++) {

      label.push(this.count[i].supplier);
      data.push(this.count[i].no_of_articles);
    }



    const bar = new Chart(document.getElementById('bar-chart'), {
      type: 'bar',
      data: {

        labels: label,
        //labels: [this.count[0].supplier,this.count[1].supplier,this.count[2].supplier,this.count[3].supplier,this.count[4].supplier,this.count[5].supplier],
        datasets: [
          {
            label: 'count  ',
            backgroundColor: ['#39a8d0', '#7D6608', '#9092a5', '#fed33d', '#138D75', '#f36b56', '#FE8000', '#3E8000', '#015680', '#7E0000', '#CD853F', 'purple', '#2E86C1', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],

            //data: [this.count[0].no_of_articles,this.count[1].no_of_articles,this.count[2].no_of_articles,this.count[3].no_of_articles,this.count[4].no_of_articles,this.count[5].no_of_articles]
            data: data,

          },

        ]
      },
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            gridLines: {
              display: true
            },
            //         display: true,
            ticks: {
              //             suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
              //             //suggestedMax: 100,    // minimum will be 0, unless there is a lower value.
              //             // OR //
              beginAtZero: true   // minimum value will be 0.
            }
          }],
          xAxes: [{
            ticks: {
              maxRotation: 86,
              minRotation: 86,
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
        title: {
          display: true,
          text: 'No of Articles by Supplier'
        },
        // maintainAspectRatio: true,
        //responsive: false
      }
    });
    //this.hidden = true;

  }

  printReport() {
    this.router.navigate(['/reports/print-fabric-article']);

  }

}
