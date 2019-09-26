import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  u_name:any='';
  pass:any='';
  //responce='';

  toggleFormClass;
  showTable: boolean;

  constructor(private http: HttpClient,private router:Router,private authenticationService:AuthenticationService) { }

  ngOnInit() { };

  showSignUp() {
    this.toggleFormClass = 'bounceLeft';
  }

  showLogin() {
    this.toggleFormClass = 'bounceRight';
    //this.toggleFormClass = 'bounceLeft';
  }
 Login() {
  this.authenticationService.ValidateUser(this.u_name,this.pass);
  }
}
