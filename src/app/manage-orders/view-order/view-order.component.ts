import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewOrderComponent  {
  dtOptions:any;

  loading:boolean=false;

   orders=[];
  showTable:boolean=true;

    constructor(private http: HttpClient,private authenticationService: AuthenticationService,private router:Router,private someSharedService: SomeSharedService) { }

    ngOnInit() {

      this.dtOptions = {
        pagingType: 'full_numbers',
          pageLength: 100,
          scrollX:true,
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
      this.FetchAllSupplierOrder();

   }
  async FetchAllSupplierOrder(){

     this.loading=true;
     const url = 'http://'+this.someSharedService.ip+'/api/Orders/FetchAllSupplierOrder';
     let params=null;

     let response=await this.authenticationService.send_call(url,params);

     if(response['data']){
       if(response['data']['_body']){
         if(response['data']['_body'].length>0)
         {
           const a=JSON.parse(response['data']['_body']);
           this.orders=a['orders'];
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


}
