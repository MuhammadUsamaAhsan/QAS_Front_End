import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';
import { SomeSharedService } from '../../globals/globals.component';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../Services/authentication.service';



@Component({
  selector: 'app-article-customer-summary',
  templateUrl: './article-customer-summary.component.html',
  styleUrls: ['./article-customer-summary.component.scss'],
  providers: [ SomeSharedService ]
})
export class ArticleCustomerSummaryComponent implements OnInit {
  private readonly notifier: NotifierService;

  start_date:any;
   end_date:any;
   hidden:boolean=false;
  showTable: boolean = true;

 month=null;

  article = [];
  fabric = null
  customer =null;
  customer_ = [];
  fabric_ = [];
  fabric_code='';
  loading:boolean=false;
  ShowError:boolean=false;

  inline: FlatpickrOptions = {
    inline: true
  };

  date1: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",  };

    selectItems = ['uzair', 'usama', 'ali'];

 constructor(private http: HttpClient, private authenticationService: AuthenticationService,notifierService: NotifierService,private router:Router,private route:ActivatedRoute,private someSharedService: SomeSharedService,private datePipe: DatePipe) {
  this.notifier=notifierService;

}

  ngOnInit() {
    this.getArticles();
    //this.barChart();
  }

 async getArticles(){

    this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchAllArticles';
  let params=null;

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.fabric_=a['fabric'];
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

 async ViewArticleWiseCustomerReport(){


    this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/ViewArticleWiseCustomerReport';
  let  params= {

    fabric_code:this.fabric_code,
    start_date:this.datePipe.transform(this.start_date,"dd-MM-yyyy"),
    end_date:this.datePipe.transform(this.end_date,"dd-MM-yyyy"),

  }
  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.article=a['article'];

        if(this.article.length!=0){

          this.loading=false;

          this.barChart();
        }
        else{
          this.loading=false;
          this.ShowError=true;
          this.hidden=false;
        }

       // console.log("Role:",this.Roles);

      }
      else{
        this.loading=false;
        //this.ShowError=true;
        //console.log("error: 0 records");
        this.notifier.notify('error','No Data Found!!!');
      }
    }   else{
      this.loading=false;
      //console.log("_body empty");
      this.notifier.notify('error','No Data Found!!!');
    }

  }
  else
  {
    this.loading=false;
   // console.log("error in FecthAllDepartments:","No Data Found!!!");
    //this.notifier.notify('error','No Data Found!!!');
  }


}

// viewbarchart(){
//   this.barChart();

// }

ViewChart(){
//this.hidden=true;
this.ViewArticleWiseCustomerReport();


}


barChart() {
  //this.ViewChart();

  // this.count =   [{supplier: "US-Denim", no_of_articles: 11, total: 28},
  // {supplier: "Rantex", no_of_articles: 5, total: 28}]

    var i=0;
    var  label=[];
    var data=[];

        for( i=0;i<this.article.length;i++){

          label.push(this.article[i].customer);
          data.push(this.article[i].quantity);
        }


            const bar = new Chart(document.getElementById('bar-chart'), {
              type: 'bar',
              data: {

                labels: label,
                //labels: [this.count[0].supplier,this.count[1].supplier,this.count[2].supplier,this.count[3].supplier,this.count[4].supplier,this.count[5].supplier],
                datasets: [
                  {
                    label: 'count  ',
                    backgroundColor: ['#39a8d0', '#7D6608','#9092a5','#fed33d', '#138D75','#f36b56','#FE8000','#3E8000','#015680','#7E0000','#CD853F','purple','#2E86C1','#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],

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
                    display : true
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
                  text: "Customer wise Article's Quantity"
                },
              // maintainAspectRatio: true,
                //responsive: false
              }
            });



        this.hidden=true;
    }
}
