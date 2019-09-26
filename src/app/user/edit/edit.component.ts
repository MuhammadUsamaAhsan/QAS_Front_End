import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute,Params} from '@angular/router';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { NotifierService } from 'angular-notifier';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ SomeSharedService ]
})
export class EditComponent implements OnInit {
  private readonly notifier: NotifierService;



  id:any;
  user_type_id:any;
   users=[];
   temp_users=[];
   UserRoles=[];
  showTable:boolean=true;
  joining_date:any;
  left_date:any;
  birth_date:any;

  binding_joining_date:any='';
  binding_left_date:any='';
  binding_birth_date:any='';
  public loading :boolean=false;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService,private router:Router,private route:ActivatedRoute,private datePipe: DatePipe,notifierService: NotifierService,private someSharedService: SomeSharedService) {
    this.notifier = notifierService;

  }

 async ngOnInit() {

    this.id= this.route.snapshot.params['id'];
  await  this.FetchUserById();
         this.FecthAllRoles();


}

inline: FlatpickrOptions = {
  inline: true
};
date: FlatpickrOptions = {

  // altInput: true,
  // altFormat: "F j, Y",
  // dateFormat: "Y-m-d",
  defaultDate: '2017-03-15'
  };

async FetchUserById(){

  this.loading=true;
  const url = 'http://'+this.someSharedService.ip+'/api/Users/GetUserById';
  let params={
    id:this.id
  };

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        const a=JSON.parse(response['data']['_body']);
         this.temp_users=a['users'][0];
         this.binding_joining_date=this.temp_users['joining_date'];
         this.binding_joining_date=this.datePipe.transform(this.binding_joining_date,"yyyy-MM-dd");

         this.binding_left_date=this.temp_users['left_date'];
         this.binding_left_date=this.datePipe.transform(this.binding_left_date,"yyyy-MM-dd");

         this.binding_birth_date=this.temp_users['birth_date'];
         this.binding_birth_date=this.datePipe.transform(this.binding_birth_date,"yyyy-MM-dd");

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

 async FecthAllRoles() {

      this.user_type_id=this.authenticationService.getRoleId();
    
          const url = 'http://'+this.someSharedService.ip+'/api/Users/FetchAllUsertypes';
          let params={
            user_id:this.user_type_id
          };
  
          let response=await this.authenticationService.send_call(url,params);
    
          if(response['data']){
            if(response['data']['_body']){
              if(response['data']['_body'].length>0)
              {
                this.loading=false;
    
                const a=JSON.parse(response['data']['_body']);
                this.UserRoles=a['userType'];
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

 async updateUser(){

  this.loading=true;
    

    this.user_type_id=this.authenticationService.getRoleId();
  

    const url = 'http://'+this.someSharedService.ip+'/api/Users/UpdateUser';
    let params={
      id:this.id,
      user_name:this.temp_users['user_name'],
      first_name:this.temp_users['first_name'],
      last_name:this.temp_users['last_name'],
      phone:this.temp_users['phone'],
      email:this.temp_users['email'],
      address:this.temp_users['address'],
      cnic:this.temp_users['cnic'],
      joining_date:this.datePipe.transform(this.joining_date,"yyyy-MM-dd"),
      left_date:this.datePipe.transform(this.left_date,"yyyy-MM-dd"),
      birth_date:this.datePipe.transform(this.birth_date,"yyyy-MM-dd"),
      user_type_id:this.temp_users['user_role_id'],
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
         // this.UserRoles=a['userType'];
         if(a==1){
           console.log(a);

           this.notifier.notify('success','User updated successfully');
           this.loading=false;
           this.router.navigate(['/user/view']);
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


