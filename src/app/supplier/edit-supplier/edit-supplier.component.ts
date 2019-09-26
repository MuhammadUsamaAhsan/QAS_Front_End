import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute,Params} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SomeSharedService } from '../../globals/globals.component';
//import { ViewChild, ElementRef} from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';


@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss'],
  providers: [ SomeSharedService ]
})
export class EditSupplierComponent implements OnInit {

 // @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  private readonly notifier: NotifierService;


  name='';
  first_name='';
  last_name='';
  phone='';
  email='';
  address='';
  country_id=null;
  country_name='';
  id:any;

  private countries=[];
  private newCountry=[];
  private suppliers=[];
   suppliers_list=[];
   suppliers_list_=[];
  showTable:boolean=true;
  public loading :boolean=false;


    constructor(private http: HttpClient, private authenticationService: AuthenticationService,private router:Router,private route:ActivatedRoute,notifierService: NotifierService,private someSharedService: SomeSharedService) {

      this.notifier = notifierService;
     }

    ngOnInit() {
      this.id= this.route.snapshot.params['id'];
      this.GetSupplierById();
     

    }

   async GetSupplierById(){

this.loading=true;
    const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/GetSupplierById';
    let params={
      id:this.id
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
          this.suppliers_list_=a['suppliers'][0];
         
          this.getCountries();
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

    }
    else
    {
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
      
}

   }

    async getCountries() {

      const url = 'http://'+this.someSharedService.ip+'/api/Users/FetchAllCountries';
            let params=null;
    
            let response=await this.authenticationService.send_call(url,params);
      
            if(response['data']){
              if(response['data']['_body']){
                if(response['data']['_body'].length>0)
                {
                  this.loading=false;
      
                  const a=JSON.parse(response['data']['_body']);
                  this.countries=a['country'];
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
  async AddNewCountry() {

    this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/AddCountry';
    let params={
      country: this.country_name
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
         // this.UserRoles=a['userType'];
         if(a==1){
          this.loading=false;
           //console.log(a);
           //this.notifier.notify('success','New Country added successfully');
          // this.closeAddExpenseModal.nativeElement.click();
          // this.newCountry = [];
          // this.getCountries();
          // this.router.navigate(['/supplier/view-supplier']);
         }
         else{

          this.notifier.notify( 'error', 'Country not added' );
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

    }
    else
    {
     // console.log("error in FecthAllDepartments:","No Data Found!!!");
      //this.notifier.notify('error','No Data Found!!!');
    }

  }
 async updateSupplier(){

  this.loading=true;

    const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/UpdateSupplier';
    let params={
      
    id:this.id,
    name:this.suppliers_list_['name'],
    first_name:this.suppliers_list_['first_name'],
    last_name:this.suppliers_list_['last_name'],
    phone:this.suppliers_list_['phone'],
    email:this.suppliers_list_['email'],
    address:this.suppliers_list_['address'],
    country_id:this.suppliers_list_['country_id']

    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
         // this.UserRoles=a['userType'];
         if(a==1){
           //console.log(a);
           this.notifier.notify( 'success', 'Supplier is updated successfully!!' );
           this.loading=false;
           this.router.navigate(['/supplier/view-supplier']);
         }
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


}

