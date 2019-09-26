import { AuthenticationService } from './../Services/authentication.service';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Http, Headers, Response} from '@angular/http';




@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements OnInit,CanActivate
{
  rights:any=[];
  modules:any=[];

  constructor(public auth: AuthenticationService, public router: Router) {
  }
  ngOnInit() {
    // this.modules=this.auth.fetchmodules();
    // console.log("mod",this.modules)
  }
  //this.rights=JSON.parse("[" +  this.authenticationService.GetUserRights() + "]");

   canActivate(): boolean {
    this.modules=this.auth.SetModuleRights(this.auth.getToken());
    // console.log(this.modules);
    this.modules=JSON.parse(  this.modules );


    // this.ngOnInit();

    this.rights=[this.auth.GetUserRights()];
    // this.rights=[1,2,3,4,5,6,7,8,9]
    this.rights=JSON.parse("[" +  this.rights + "]");
    // console.log(this.rights);


    if (this.auth.isAuthenticated() && this.rights.includes(this.modules.find(x=>x.module == "Dashboard").id)) {

     // console.log('You are admin, go through!');
      return true;
    }
    //console.log('You are not admin, go through!');

    return false;
  }




}
