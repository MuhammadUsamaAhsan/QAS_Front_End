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
  selector: 'app-view-fabric-supplier',
  templateUrl: './view-fabric-supplier.component.html',
  styleUrls: ['./view-fabric-supplier.component.scss'],
  providers: [SomeSharedService]
})
export class ViewFabricSupplierComponent {

  private readonly notifier: NotifierService;

  barchart;
  total = null;
  month = null;
  start_date: any;
  end_date: any;
  num: string;

  supp = [];
  months = [];
  supplier = '';
  quantity = '';
  hidden: boolean = false;

  dtOptions: any = {};
  showTable: boolean = true;

  loading:boolean=false;
  ShowError:boolean=false;

  suppliers = [];
  quantities = [];

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

    this.barChart();

    this.dtOptions = {
      // ajax: 'data/data.json',
      pagingType: 'full_numbers',
      pageLength: 100,
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
        'pageLength',


      ],

    };

    this.FetchSupplierFabric();

    this.month = (new Date().getMonth() );

    this.FetchSupplierQuantityMonthly();
    //this.FetchSupplierQuantity();

  }



  printReport() {

    this.router.navigate(['/reports/print-fabric-supplier']);

  }

  viewGraph() {



    console.log(this.month);
    this.FetchSupplierQuantity();

    // if(this.month>0 && this.month<13){

    //   this.FetchSupplierQuantityMonthly();
    // }
    // else{
    //   this.month=null;
    // this.FetchSupplierQuantity();
    // }

  }


  barChart() {



    var i = 0;
    var label = [];
    var data = [];
    var data1 = [];


    for (i = 0; i < this.quantities.length; i++) {

      label.push(this.quantities[i].supplier);
      data.push(this.quantities[i].quantity);
    }
    console.log(label);

    for (var i = 0; i < this.quantities.length; i++) {
      //this.quantities_=numeral(this.quantities[i]['quantity']).format('0,0');
      // data.push((numeral(this.quantities[i]['quantity']).format(0,0)) );
      // data=data.map(parseFloat)
      // data1.push(data1[i].replace(/"/g, "") );
      //data1.split(',').map(parseInt);

    }
    //console.log(data);
    console.log(data);

    // console.log("dta",this.quan tities[0].supplier);

    const bar = new Chart(document.getElementById('bar-chart'), {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Articles(quantity_supplier_wise)',
            backgroundColor: ['#2E86C1', '#FFC600', '#138D75', 'purple', '#F36B56', '#CD853F', 'yellow', '#2E86C1', '#FFC600', '#138D75', '#F36B56', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],

            data: data


          }
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
          text: 'Supplier Wise Fabric'
        },
        // maintainAspectRatio: true,
        //responsive: false
      }
    });

  }


 async FetchSupplierFabric() {


    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchFabricBySupplier';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.suppliers=a['fs'];
          this.loading=false;
          this.showTable = true;
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

  // numberWithCommas(x) {
  //           var parts = x.toString().split(".");
  //           parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //           return parts.join(".");
  //       }

 async FetchSupplierQuantity() {


  this.loading=true;
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


        if(this.quantities.length>0){

          this.barChart();
          this.hidden = true;
          this.loading=false;
          this.ShowError=false;
          this.showTable=true;

          this.total = this.quantities[0]['total'];

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
 async FetchSupplierQuantityMonthly() {


  this.loading=true;
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


        if(this.quantities.length>0){

          this.barChart();
          this.hidden = true;
          this.loading=false;
          this.ShowError=false;
          this.showTable=true;

          this.total = this.quantities[0]['total'];

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
}
