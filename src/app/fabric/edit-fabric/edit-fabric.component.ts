import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute,Params} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-edit-fabric',
  templateUrl: './edit-fabric.component.html',
  styleUrls: ['./edit-fabric.component.scss'],
  providers: [ SomeSharedService ],
})
export class EditFabricComponent implements OnInit {
  private readonly notifier: NotifierService;

  id:any;
  fabric_code='';
  showTable: boolean = true;
  public loading :boolean=false;

     fabric=[];
     suppliers=[];
     fabric_1=[];
    constructor(private http: HttpClient,private router:Router,private authenticationService: AuthenticationService,private route:ActivatedRoute,notifierService: NotifierService,private someSharedService: SomeSharedService) {

      this.notifier = notifierService;
     }

  async  ngOnInit() {
      await   this.getSupplier();
      this.id= this.route.snapshot.params['id'];
      this.GetFabricById();
     }

async GetFabricById(){


  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/GetFabricById';
  let params={
    id:this.id
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {

        this.loading=false;
        const a=JSON.parse(response['data']['_body']);
        this.fabric_1=a['fab'][0];
       
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

 async getSupplier(){

  this.loading=true;

              const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/FetchAllSuppliers';
              let params=null;
          
              let response=await this.authenticationService.send_call(url,params);
          
              if(response['data']){
                if(response['data']['_body']){
                  if(response['data']['_body'].length>0)
                  {
          
                    const a=JSON.parse(response['data']['_body']);
                    this.suppliers=a['suppliers'];
                   
          
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
          

 async updateFabric(){

  this.loading=true;

    this.id= this.route.snapshot.params['id'];

    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/UpdateFabric';
    let params={
      id:this.id,
      fabric:this.fabric_1["fabric_code"],
      supplier_id:this.fabric_1["supplier_id"],
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
         // this.UserRoles=a['userType'];
         if(a==1){
          // console.log(a);
           this.notifier.notify( 'success', 'Fabric Code is updated successfully' );
           this.loading=false;
           this.router.navigate(['/fabric/view-fabric']);
         }
         else{
          this.loading=false;
          this.notifier.notify( 'error', 'Fabric code not updated!  check server' );
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

