import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute,Params} from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewComponent implements OnInit {
  private readonly notifier: NotifierService;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('closeAddExpenseModal1') closeAddExpenseModal1: ElementRef;

  dtOptions:any={};
  users=[];
  temp_users=[];
  showTable:boolean=true;
  id:any;
  j:any;
  public loading :boolean=false;



    constructor(private http: HttpClient, private authenticationService: AuthenticationService,private router:Router,private route:ActivatedRoute,notifierService: NotifierService,private someSharedService: SomeSharedService) {
      this.notifier = notifierService;

    }

    ngOnInit() {

this.FetchAllUsers();
      this.dtOptions = {

        pagingType: 'full_numbers',
        pageLength: 10,
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


        ],

      };

    
      }

   async FetchAllUsers(){
    this.loading=true;
    
    const url = 'http://'+this.someSharedService.ip+'/api/Users/FetchAllUsers';
    let params=null;

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.users=a['users'];
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

   index(j,id){

    this.id=id;
    this.j=j;
  
  }

async DeleteUser(){
   
  this.loading=true;
  this.id=this.users[this.j]['id'];
  
    for(let i = 0; i < this.users.length; ++i){
      if (this.users[i].id === this.id) {
          this.users.splice(i,1);
      }
  }
  
  const url = 'http://'+this.someSharedService.ip+'/api/Users/DeleteUser';
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



