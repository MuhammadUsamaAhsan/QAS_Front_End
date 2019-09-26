
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-view-fabric',
  templateUrl: './view-fabric.component.html',
  styleUrls: ['./view-fabric.component.scss'],
  providers: [ SomeSharedService ]
})
export class ViewFabricComponent implements OnInit {

   fabrics=[];
  showTable:boolean=true;
  public loading :boolean=false;

  dtOptions: any = {};
 constructor(private http: HttpClient,private authenticationService: AuthenticationService, private router: Router,private someSharedService: SomeSharedService) { }

    ngOnInit()  {

      this.FetchAllFabrics();

      this.dtOptions = {


        pagingType: 'full_numbers',
        pageLength: 10,

        scrollY: 400,
        paging: true,
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

 async FetchAllFabrics(){
this.loading=true;

  const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/FetchAllFabrics';
  let params=null;

  let response=await this.authenticationService.send_call(url,params);

  if(response['data']){
    if(response['data']['_body']){
      if(response['data']['_body'].length>0)
      {
        this.loading=false;
        const a=JSON.parse(response['data']['_body']);
        this.fabrics=a['fabrics'];
       
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


