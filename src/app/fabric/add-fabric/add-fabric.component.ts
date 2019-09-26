import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';


@Component({
  selector: 'app-add-fabric',
  templateUrl: './add-fabric.component.html',
  styleUrls: ['./add-fabric.component.scss'],
  providers: [ SomeSharedService ]
})
export class AddFabricComponent implements OnInit {

  private readonly notifier: NotifierService;
  registerForm: FormGroup;
  submitted=false;
   fabrics=[];
   new_fabrics=[];
   suppliers=[];
   fabric_code='';
   supplier_id=null;
  showTable:boolean=true;
  public loading :boolean=false;
  form: any;
  register

  constructor(private http: HttpClient, private authenticationService: AuthenticationService,private router:Router,private formBuilder: FormBuilder,notifierService: NotifierService,private someSharedService: SomeSharedService) {

    this.notifier = notifierService;
  }
  ngOnInit(){

    this.getSupplier();

    this.registerForm = this.formBuilder.group({
      fabric_code: ['', Validators.required],
      supplier_id: ['', Validators.required]

    });
  }


  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else{
   
    }
  }

  onSubmit2() {
    //alert('SUCCESS!! :-)')
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
          this.loading=false;
          const a=JSON.parse(response['data']['_body']);
          this.suppliers=a['suppliers'];
         

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

async addfabric(){

  this.loading=true;

  if (!this.registerForm.invalid) {


    const url = 'http://'+this.someSharedService.ip+'/api/Fabrics/AddFabric';
    let params={
      fabric:this.fabric_code,
      supplier_id:this.supplier_id
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
           this.notifier.notify( 'success', 'Fabric Code is added successfully!!' );
           this.loading=false;
           this.router.navigate(['/fabric/view-fabric']);
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
  else{

      //alert("Please Enter Valid Data!!!!");
    }


  }

}





