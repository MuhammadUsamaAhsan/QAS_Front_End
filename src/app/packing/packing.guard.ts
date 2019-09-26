import { AuthenticationService } from './../Services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackingGuard implements CanActivate {
  rights:any=[];
  modules:any=[];

  constructor(public auth: AuthenticationService, public router: Router) {
  }
    canActivate(): boolean {
    this.modules=this.auth.SetModuleRights(this.auth.getToken());
    // console.log(this.modules);
    this.modules=JSON.parse(  this.modules );


    // this.ngOnInit();

    this.rights=[this.auth.GetUserRights()];
    //this.rights=[1,2,3,4,5,6,7,8,9]
    this.rights=JSON.parse("[" +  this.rights + "]");
    // console.log(this.rights);


    if (this.auth.isAuthenticated() && this.rights.includes(this.modules.find(x=>x.module == "Packing").id)) {
     // console.log('You are admin, go through!');
      return true;
    }
    //console.log('You are not admin, go through!');

      return false;
  }
}
