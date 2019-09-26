import { SomeSharedService } from '../globals/globals.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GenericHeaderService {
  units:any=[];
  shifts:any=[];
  lines:any=[];
  accessories:any=[];
  line_no:any;
  unit:any;
  shift:any;
  date:any='';

  user_name:any='';
  type:any='';
  wash_type:any='';
  supplier_type:any='';
  user_id:any;
  item_id:any;
  supplier_id:any;
  generic_header_id:any;
  customers:any=[];
  supp_orders:any=[];
  suppliers:any=[];
  constructor(private http:HttpClient,private authenticationService: AuthenticationService, private router: Router, private datePipe: DatePipe,  private someSharedService: SomeSharedService)
  {
  }

  async CheckSaveGenericHeader(unit_id:any,shift:any,line_no:any,user_id:any,type:any,date:any){

    // this.loading=true;


       const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchHeaderId';
       let params={
         unit_id:unit_id,
         shift:shift,
         line:line_no,
         user_id:user_id,
         type:type,
         //c_by:this.user_id,
         date:this.datePipe.transform(date,"yyyy-MM-dd")
       };

       let response=await this.authenticationService.send_call(url,params);

       if(response['data']){
         if(response['data']['_body']){
           if(response['data']['_body'].length>0)
           {

             const a=JSON.parse(response['data']['_body']);
             this.generic_header_id=a['header_id'];

            // if(a['header_id']!=0){
            //   this.notifier.notify( 'success', 'Header saved successfully' );
            //   this.loading=false;
            //  console.log("header_id", this.generic_header_id)
            }
            // console.log("Role:",this.Roles);

           }
           else{
             //console.log("error: 0 records");
            // this.notifier.notify('error','No Data Found!!!');
           }
         }   else{
           //console.log("_body empty");
          // this.notifier.notify('error','No Data Found!!!');
         }
            return this.generic_header_id;
       }







    async GetUnits() {

     const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchAllUnits';
     let params=null;

     let response=await this.authenticationService.send_call(url,params);

     if(response['data']){
       if(response['data']['_body']){
         if(response['data']['_body'].length>0)
         {
           const a=JSON.parse(response['data']['_body']);
           this.units=a['unit_list'];


          // console.log("Role:",this.Roles);

         }
         else{


         }
       }   else{


         //console.log("_body empty");
        // this.notifier.notify('error','No Data Found!!!');
       }

     }
     else
     {


      // console.log("error in FecthAllDepartments:","No Data Found!!!");
       //this.notifier.notify('error','No Data Found!!!');
     }
   }

   async GetShifts() {

     const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchAllShift';
     let params=null;

     let response=await this.authenticationService.send_call(url,params);

     if(response['data']){
       if(response['data']['_body']){
         if(response['data']['_body'].length>0)
         {
           const a=JSON.parse(response['data']['_body']);
           this.shifts=a['shift_list'];


          // console.log("Role:",this.Roles);

         }
         else{


         }
       }   else{


         //console.log("_body empty");
        // this.notifier.notify('error','No Data Found!!!');
       }

     }
     else
     {
      // console.log("error in FecthAllDepartments:","No Data Found!!!");
       //this.notifier.notify('error','No Data Found!!!');
     }
   }

   async GetLines() {

     const url = 'http://'+this.someSharedService.ip+'/api/GenericHeader/FetchAllLines';
     let params=null;

     let response=await this.authenticationService.send_call(url,params);

     if(response['data']){
       if(response['data']['_body']){
         if(response['data']['_body'].length>0)
         {
           const a=JSON.parse(response['data']['_body']);
           this.lines=a['line_list'];
          // console.log("Role:",this.Roles);

         }
         else{

         }
       }   else{


         //console.log("_body empty");
        // this.notifier.notify('error','No Data Found!!!');
       }

     }
     else
     {
      // console.log("error in FecthAllDepartments:","No Data Found!!!");
       //this.notifier.notify('error','No Data Found!!!');
     }
     return this.lines;
   }

   async GetSuppliers() {

     this.supplier_type='Accessories';

     const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/FetchAllSuppliers';
     let params={
       supplier_type:this.supplier_type
     };

     let response=await this.authenticationService.send_call(url,params);

     if(response['data']){
       if(response['data']['_body']){
         if(response['data']['_body'].length>0)
         {
           const a=JSON.parse(response['data']['_body']);
           this.suppliers=a['suppliers'];
          // console.log("Role:",this.Roles);

         }
         else{

         }
       }   else{


         //console.log("_body empty");
        // this.notifier.notify('error','No Data Found!!!');
       }

     }
     else
     {
      // console.log("error in FecthAllDepartments:","No Data Found!!!");
       //this.notifier.notify('error','No Data Found!!!');
     }
   }





}
