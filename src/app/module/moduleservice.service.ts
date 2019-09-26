import { AuthenticationService } from './../Services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleserviceService {
modules:any=[];
  constructor(private authenticationService: AuthenticationService) { }
  async FetchModules(){
    const url = 'http://192.168.1.105:5002/api/Module';
    let params=null;
    let response=await this.authenticationService.send_call(url,params);
    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.modules=a['modules'];
          console.log("Modules:",this.modules);
        }
        else{
        }
      }   else{
        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }
    }
    else
    {
    }
  }
}
