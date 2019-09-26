import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute,Params} from '@angular/router';
import { SomeSharedService } from '../../globals/globals.component';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../Services/authentication.service';



@Component({
  selector: 'app-supplier-wise-articles',
  templateUrl: './supplier-wise-articles.component.html',
  styleUrls: ['./supplier-wise-articles.component.scss'],
  providers: [ SomeSharedService ]
})
export class SupplierWiseArticlesComponent implements OnInit {
  private readonly notifier: NotifierService;

  month=null;

  start_date:any;
  end_date:any;
  suppliers_articles=[];
  months=[];
  hidden:boolean=false;
  dtOptions:any={};

  total_quantity=null;
  loading:boolean=false;
  ShowError:boolean=false;

 showTable:boolean=true;
 inline: FlatpickrOptions = {
  inline: true
};

date1: FlatpickrOptions = {

  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",  };

  constructor(private http: HttpClient,private authenticationService: AuthenticationService,notifierService: NotifierService,private datePipe: DatePipe,private router:Router,private route:ActivatedRoute,private someSharedService: SomeSharedService) { }

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

    this.month = (new Date().getMonth() );
    this.SupplierFabricReportMonthly();



    this.dtOptions = {
      pagingType: 'full_numbers',
        pageLength: 15,

        scrollY:400,
        paging:true,
        processing: true,
        order: ([0,'asc']),

        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [

          'copy',
          'print',
          'excel',


        ],

    };


     }


 async SupplierFabricReport(){



    this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/SupplierArticleWiseReport';
  let  params= {

    start_date:this.datePipe.transform(this.start_date,"dd-MM-yyyy"),
    end_date:this.datePipe.transform(this.end_date,"dd-MM-yyyy")

  }
  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.suppliers_articles=a['swa'];


        if(this.suppliers_articles.length!=0){
          this.total_quantity=this.suppliers_articles[0]["total_quantity"];
          this.loading=false;
          this.hidden=true;

          //this.barChart();
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


 async SupplierFabricReportMonthly(){


    this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/SupplierArticleWiseReportMonthly';
  let  params= {
    month:this.month
  }
  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
        this.suppliers_articles=a['swa'];


        if(this.suppliers_articles.length!=0){
          this.total_quantity=this.suppliers_articles[0]["total_quantity"];
          this.loading=false;
          this.hidden=true;

          //this.barChart();
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


 viewGraph(){

this.SupplierFabricReport();

     }


}
