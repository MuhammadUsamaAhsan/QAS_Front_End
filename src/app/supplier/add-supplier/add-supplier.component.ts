
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ViewChild, ElementRef} from '@angular/core';
import { SomeSharedService } from '../../globals/globals.component';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
  providers: [ SomeSharedService ]
})
export class AddSupplierComponent implements OnInit {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  private readonly notifier: NotifierService;
  registerForm: FormGroup;
  submitted: any;

  name: '';
  first_name: '';
  last_name: '';
  phone: '';
  email: '';
  address: '';
  country_name: '';
  country_id: null;
  country_id1: null;
  user_type_id:any= null;
  form: any;

  dtOptions: any = {};
  register;
  

   countries = [];
   suppliers = [];
   newCountry = [];
  showTable = true;
  public loading :boolean=false;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,notifierService: NotifierService,private someSharedService: SomeSharedService) {

      this.notifier=notifierService;
     }

    ngOnInit() {

        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 15,

          scrollY: 400,
          paging: true,
          processing: true,
        };

        this.user_type_id=this.authenticationService.getRoleId();

      this.getCountries();

      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        country_id: ['', [Validators.required]]
      });

    }
   public get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else{

   
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
          // console.log(a);
           this.notifier.notify('success','New Country added successfully');
           this.loading=false;
           this.closeAddExpenseModal.nativeElement.click();
           this.newCountry = [];
           this.getCountries();
          // this.router.navigate(['/supplier/view-supplier']);
         }
         else{
          this.loading=false;
          this.notifier.notify( 'error', 'Country not added' );
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

 async getCountries() {
  this.loading=true;

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

async addSupplier() {

  this.loading=true;
  if (!this.registerForm.invalid) {

    

    const url = 'http://'+this.someSharedService.ip+'/api/Suppliers/AddSupplier';
    let params={
      name: this.name,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
  // tslint:disable-next-line: whitespace
      email:this.email,
      address: this.address,
      country_id: this.country_id
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

           this.notifier.notify( 'success', 'New Supplier is added successfully!!' );
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

else{
  this.loading=false;
 // alert("Please ENter Valid data!!!");
}


}
s
}

