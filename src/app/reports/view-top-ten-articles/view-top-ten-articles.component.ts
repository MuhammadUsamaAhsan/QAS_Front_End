import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { SomeSharedService } from '../../globals/globals.component';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-view-top-ten-articles',
  templateUrl: './view-top-ten-articles.component.html',
  styleUrls: ['./view-top-ten-articles.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewTopTenArticlesComponent {
  private readonly notifier: NotifierService;
  barchart;

  start_date:any;
   end_date:any;
   hidden:boolean=false;

  total=null;
  articles_total=null;
  month=null;

  dtOptions:any={};

   articles = [];
   months = [];
   top10articles=[];
   top10articles_=[];
   //top10SupplierWise=[];
  showTable: boolean = true;
  loading:boolean=false;
  ShowError:boolean=false;
  showTable_:boolean=false;

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
//this.barChart();

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
      pageLength: 100,
      scrollY:400,
      paging:true,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [

        'copy',
        'print',
        'excel',
        'pageLength',

      ],

    };

    this.month = (new Date().getMonth() );
    this.MonthlyReport();

    

    this.ViewTopTenArticles();
  }
  // printReport(){
  //   this.router.navigate(['/reports/print-top-ten-articles']);

  // }

 async ViewTopTenArticles(){

    this.loading=true;
    
    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/ViewTopTenArticles';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.articles=a['top10'];
          this.loading=false;
          this.showTable_=true;
          this.ShowError=false;
         // console.log("Role:",this.Roles);

        }
        else{
          this.loading=false;
          this.showTable_=false;
          this.ShowError=true;
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

  viewGraph(){

    this.top10();
    this.top10SupplierWise();
    //this.hidden=true;

  }

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
  
  
          if(this.top10articles.length>0){
  
            this.hidden = true;
            this.barChart();
            this.total = this.top10articles[0]['total'];
           // this.loading=false;
            this.ShowError=false;
            this.showTable=true;
  
            }
  
          else{
            this.hidden = true;
           // this.loading=false;
            this.ShowError=true;
            this.showTable=false;
  
            //this.notifier.notify('error', 'Error!!! Data not available');
          }
  
         // console.log("Role:",this.Roles);
  
        }
        else{
        // this.loading=false;
  
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
          
  
          if(this.top10articles_.length>0){
  
            this.hidden = true;
            this.barChart();
            this.articles_total = this.top10articles_[0]['total'];
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

 async top10Monthly(){

    //this.loading=true;
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
  
  
          if(this.top10articles.length>0){
  
            this.hidden = true;
            this.barChart();
            this.total = this.top10articles[0]['total'];
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

  MonthlyReport(){


    this.top10MonthlyWRTSupplier();
    this.top10Monthly();
  }

 async top10MonthlyWRTSupplier(){


    
    this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/TopTenArticlesSupplierWIseMonthly';
    let params={
      month:this.month
    };
  
    let response=await this.authenticationService.send_call(url,params);
  
    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.top10articles_=a['top10articles_wrt_supplier'];
  
  
          if(this.top10articles_.length>0){
  
            this.hidden = true;
            this.barChart();
            this.articles_total = this.top10articles_[0]['total'];
           // this.loading=false;
            this.ShowError=false;
            this.showTable=true;
  
            }
  
          else{
            this.hidden = false;
           // this.loading=false;
            this.ShowError=true;
            this.showTable=false;
  
            //this.notifier.notify('error', 'Error!!! Data not available');
          }
  
         // console.log("Role:",this.Roles);
  
        }
        else{
        // this.loading=false;
  
        }
      }   else{
       //this.loading=false;
  
        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }
  
    }
    else
    {
     //this.loading=false;
  
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }


  }


  barChart() {
    var i=0;
    var  label=[];
    var data=[];


    for( i=0;i<this.top10articles.length;i++){

      label.push(this.top10articles[i].fabric_code);
      data.push(this.top10articles[i].quantity);
    }


      // console.log(this.articles[0].quantity);
      const bar = new Chart(document.getElementById('bar-chart'), {
        type: 'bar',
        data: {
          labels: label,
          datasets: [
            {
              label: 'top10articles(top 10)',
              backgroundColor: ['#3ebb8c', '#9092a5', '#f36b56', '#39a8d0', '#fed33d','#884EA0','#7D6608','#52BE80','#138D75','blue','#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
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
          beginAtZero: true,
          gridLines: {
            display : true
        },
          }
          }],
          xAxes: [{
          ticks: {
            maxRotation: 84,
            minRotation: 84,
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
         // maintainAspectRatio: false,
          //responsive: true,

        }
      });



  }

}
