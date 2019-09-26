import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute,Params} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewSupplierComponent {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal1') closeAddExpenseModal1: ElementRef;

  private readonly notifier: NotifierService;

  dtOptions:any={};
   suppliers=[];
  showTable:boolean=true;

  id:any;
  j:any;
  status_type_id:any;
  clickMessage="deleted";
  public loading :boolean=false;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService,private router:Router,private route:ActivatedRoute,notifierService: NotifierService,private someSharedService: SomeSharedService) {

      this.notifier = notifierService;
     }

    ngOnInit() {


      this.dtOptions = {
        pagingType: 'full_numbers',
          pageLength: 10,

          scrollY:400,
          paging:true,
          processing: true,
          order: ([0,'desc']),

          dom: 'Bfrtip',
          // Configure the buttons
          buttons: [

            'copy',
            'print',
            'excel',
            'pageLength',

          ],

      };

      this.FetchAllSuppliers();

     
}

 async FetchAllSuppliers(){

  this.loading=true;

  const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/FetchAllSuppliers';
  let params=null;

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {

        this.loading=false;
        const a=JSON.parse(response['data']['_body']);
        this.suppliers=a['suppliers'];
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

 index(j,id){

  this.id=id;
  this.j=j;

}

async DeleteSupplier(){
  this.loading=true;
this.id=this.suppliers[this.j]['id'];

  for(let i = 0; i < this.suppliers.length; ++i){
    if (this.suppliers[i].id === this.id) {
        this.suppliers.splice(i,1);
    }
}

const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/DeleteSupplier';
let params={
  id:this.id
}

let response=await this.authenticationService.send_call(url,params);

if(response['data']){
  if(response['data']['_body']){
    if(response['data']['_body'].length>0)
    {

      const a=JSON.parse(response['data']['_body']);
      if(a==1){
        this.loading=false;
        this.notifier.notify('success','Supplier is deleted ');
      }
      else{
        this.loading=false;
        this.notifier.notify('error','Supplier not deleted ');
      }

      
    }
    else{
      this.loading=false;
     // console.log("error: site not deleted");
     // this.notifier.notify('error','No Data Found!!!');
    }
  }   else{
    this.loading=false;
   // console.log("_body empty:site not deleted");
   // this.notifier.notify('error','No Data Found!!!');
  }

}
else
{
  this.loading=false;
  //console.log("error in DeleteSite:","Site is not Deleted");
  this.notifier.notify('error','Supplier is not deleted');
}

 }
}








