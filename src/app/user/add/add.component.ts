import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from '../../Services/authentication.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { SomeSharedService } from '../../globals/globals.component';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [ SomeSharedService ]
})
 export class AddComponent implements OnInit{

 
  private readonly notifier: NotifierService;



  // dateOptions: FlatpickrOptions = { enableTime: true, dateFormat: 'd-m-Y' };
  user_name='';
  first_name='';
  last_name='';
  address='';
  phone='';
  cnic='';
  email='';

  password='';
  joining_date:'';
  left_date=null;
  birth_date=null;
  ip='';
 // last_login=null;
  user_type_id=null;
  status_type_id=null;

  registerForm: FormGroup;
   submitted=false;
  form: any;
  register

  private users=[];
  private suppliers=[];
  public UserRoles=[];
  public modules:any=[];
  showTable:boolean=true;
  public loading :boolean=false;
   expanded :boolean=false;
   optionsSelect: any=[];

  public constructor(private formBuilder: FormBuilder,private http: Http, private datePipe: DatePipe,private someSharedService: SomeSharedService,private httpClient: HttpClient, private router: Router, notifierService: NotifierService, private authenticationService: AuthenticationService) {
    this.notifier = notifierService;
  }

 async ngOnInit(){
  this.optionsSelect = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    ];

    //this.modules=await this.authenticationService.GetModuleList();

    this.FecthAllRoles();
    this.registerForm = this.formBuilder.group({


    });

    var date = new Date();
   // console.log(this.datePipe.transform(date,"yyyy-MM-dd"));
//
this.registerForm=this.formBuilder.group({

    user_name:['', Validators.required],
    first_name:['', Validators.required],
    last_name:['', Validators.required],
    address:['', Validators.required],
    phone:['', Validators.required],
    password:['', [Validators.required,Validators.minLength(6)]],
    email:['', [Validators.required, Validators.email]],
    cnic:['', Validators.required],
    joining_date:['', Validators.required],
    left_date:['', Validators.required],
    birth_date:['', Validators.required],
    //ip:['', Validators.required],
    user_type_id:['', Validators.required],
   // status_type_id:['', Validators.required],


});
  }


  inline: FlatpickrOptions = {
    inline: true
  };
  date: FlatpickrOptions = {

    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",  };

  // exampleOptions: FlatpickrOptions = { defaultDate: '', allowInput: true, altFormat: 'd-m-y',altInput: true };

   get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // this.notifier.notify( 'success', 'New User is added successfully!!' );
    //          // window.location.reload();
    //  this.router.navigate(['/user/view']);


  }
  showCheckboxes(){
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }

  onSetCheckBox() {
    // Set 'checked' or 'no-checked'
    this.myCB.setClick('checked');
    }

  async FecthAllRoles() {

    this.loading=true;
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
              this.loading=false
              //console.log("error: 0 records");
             // this.notifier.notify('error','No Data Found!!!');
            }
          }   else{
            this.loading=false
            //console.log("_body empty");
           // this.notifier.notify('error','No Data Found!!!');
          }

        }
        else
        {
          this.loading=false
         // console.log("error in FecthAllDepartments:","No Data Found!!!");
          //this.notifier.notify('error','No Data Found!!!');
        }


    }

async AddUser(){
  this.loading=true;
//console.log(this.joining_date);
  if (!this.registerForm.invalid) {


    const url = 'http://'+this.someSharedService.ip+'/api/Users/AddUser';
    let params={
    user_name:this.user_name,
    first_name:this.first_name,
    last_name:this.last_name,
    phone:this.phone,
    email:this.email,
    address:this.address,
    cnic:this.cnic,
    password:this.password,
    joining_date:this.datePipe.transform(this.joining_date,"yyyy-MM-dd"),
    left_date:this.datePipe.transform(this.left_date,"yyyy-MM-dd"),
    birth_date:this.datePipe.transform(this.birth_date,"yyyy-MM-dd"),
    user_type_id:this.user_type_id
    };

    let response=await this.authenticationService.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {

          const a=JSON.parse(response['data']['_body']);
         if(a==1){
          this.notifier.notify( 'success', 'New User is added successfully!!' );
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
else{
  this.loading=false;

  //alert("Please Enter Valid Data!!!");
}

 }
}

