import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  response:any=[];
  modules:any=[];
  private readonly notifier: NotifierService;
  showTable: boolean = true;
  calling_refresh_token: boolean = true;
  username: '';
  password: '';
  client_id: '';
  client_secret: '';
  grant_type: '';
  token: any = [];
  decodedToken: any = '';

  //myDate = new Date();
  private headers: Headers = new Headers({ 'Authorization': 'Bearer ' + this.getToken() });
  // url = 'http://192.168.1.104:5001/api/token/auth';
  constructor(private httpClient: HttpClient,private http: Http, private datePipe: DatePipe, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }
  ValidateUser(u_name, pass) {

    const data = new FormData();

    const url = 'http://uzairakram-001-site1.gtempurl.com/api/token/auth';
   
    this.showTable = false;

    return this.http.get(url, {
      params: {

        username: u_name,
        password: pass,
        grant_type: 'password',
        client_id: '100',
        client_secret: '888'
      }
    })

      // .pipe(map((data: any) => data))
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {

          setTimeout(() => { this.showTable = true; }, 0);
          // }
          this.response=data['_body'];
          const r = JSON.parse(this.response);
          //console.log("r:",r);

          if(r['message'] == 'OK'){
         // if (data) {
            //this.notifier.notify('success', 'Welcome');

            this.router.navigate(['/dashboard/dashboard-home']);

            this.response=data['_body'];
            const r = JSON.parse(this.response);

           localStorage.setItem('access-token', (r['data']['value']['response']['access_token']));
           localStorage.setItem('refresh-token', (r['data']['value']['response']['refresh_token']));

            // console.log("access-token", localStorage.getItem('access-token'));
            // console.log("refresh-token", localStorage.getItem('refresh-token'));

            this.SetModuleRights(r['data']['value']['response']['access_token']);


          }
          else {
            this.notifier.notify('error', 'Invalid username or password');
          }


        },
        error => {
          console.log('Error', error);
        }

      );
  }

  async genarate_Refresh_Token(token) {

    var refresh_token = this.getRefreshToken();
    var access_token = token;

    // this.removeToken();
    const data = new FormData();

   // const url = 'http://192.168.1.103:5001/api/token/auth';
   const url = 'http://uzairakram-001-site1.gtempurl.com/api/token/auth';
    this.showTable = false;

    var params=  {
      refresh_token: refresh_token,
      grant_type: 'refresh_token',
      client_id: '100',
      client_secret: '888',
      access_token: access_token
    };



   let resp = await this.http.get(url, {params: params}).toPromise().then(
    // let promise = await this.http.get(url, { params: params}).toPromise().then(
          data => {



            if (data) {

              this.response=data['_body'];
              const r = JSON.parse(this.response);

              if(!(r['data']==null)){
                localStorage.setItem('access-token', (r['data']['value']['response']['access_token']));
                localStorage.setItem('refresh-token', (r['data']['value']['response']['refresh_token']));
               // console.log("new-access-token", localStorage.getItem('access-token'));
               // console.log("new-refresh-token", localStorage.getItem('refresh-token'));
                this.SetModuleRights(r['data']['value']['response']['access_token']);

              }
              else{
               // console.log("error in response of refresh token!");
              }

            }
            else {
             // console.log("eder: 4 inside Error of refresh token call !!!!!");
              //this.notifier.notify( 'error', 'Invalid username or password' );
            }
          },
          error => {
            console.log('Error', error);
            this.notifier.notify('default','check server');
          });

   // console.log("resp",resp);
    return resp;
  }

  async FetchModules(){

    const url = 'http://babar515-001-site1.gtempurl.com/api/Module';
    let params=null;

    let response=await this.send_call(url,params);

    if(response['data']){
      if(response['data']['_body']){
        if(response['data']['_body'].length>0)
        {
          const a=JSON.parse(response['data']['_body']);
          this.modules=a['modules'];
          //console.log("Modules:",this.modules);
        }
        else{
        }
      }
       else{

        //console.log("_body empty");
       // this.notifier.notify('error','No Data Found!!!');
      }

    }

    else
    {

    }
    return this.modules;

  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public token_decode(token: string) {

    var decodedJwtData : any;
      let jwt = token;
      try{

      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
    }
    catch(e){
      console.log('token_decode: ' + e);
    }
      return decodedJwtData;
  }

  SetModuleRights(token: string) {


    let jwt = token

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    // console.log('jwtData: ' + jwtData)
    localStorage.setItem('user_id', decodedJwtData.user_id);
    localStorage.setItem('user_rights', decodedJwtData.user_rights);
    localStorage.setItem('module_list', JSON.stringify(decodedJwtData.module_list));
    localStorage.setItem('user_name', JSON.stringify(decodedJwtData.username));

    let module_list=JSON.stringify(decodedJwtData.module_list);
    //console.log("mod",decodedJwtData.module_list);
  this.GetUserRights();

return module_list;
  }

  GetUsername(){
    //console.log("user_name",localStorage.getItem('user_name'));
    return localStorage.getItem('user_name');
  }

  GetModuleList(){
  //  console.log("module_list",JSON.stringify(localStorage.getItem('module_list')));
    return JSON.stringify(localStorage.getItem('module_list'));

  }

  GetUserId(){
    console.log("user_id",localStorage.getItem('user_id'));
    return localStorage.getItem('user_id');

  }
  GetUserRights(){
    //console.log("user_id",localStorage.getItem('user_rights'));
    return localStorage.getItem('user_rights');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
   // console.log(localStorage.getItem('access-token'));
    return localStorage.getItem('access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  removeToken() {
    localStorage.removeItem('refresh-token');

    localStorage.removeItem('access-token');
  }
  storeRole(role: any) {
    this.removeRole();
    localStorage.setItem('role', JSON.stringify(role));
  }
  getRole() {
    // return localStorage.getItem("role");
    return JSON.parse(localStorage.getItem('Role'));
  }

  getRoleId() {
    return JSON.parse(localStorage.getItem('Role_id'));

  }

  removeRole() {
    return localStorage.removeItem('Role');
  }
  removeRoleId() {
    return localStorage.removeItem('Role_id');

  }
  removeSiteId() {
    return localStorage.removeItem('site_id');

  }



 




  getToken_() {
    var token = this.getToken();

    //console.log("token", token);
    if (token == null) {

    }
    return token;
  }

  getHeader(token: string) {
    var headers: Headers = new Headers({ 'Authorization': 'Bearer ' + token });
    return headers;
  }

  returntoLogin() {
    this.removeToken();
    this.notifier.notify('error', 'Please Login First');
    this.router.navigate(['../../login']);
  }
  getTokenExpiry(token) {
    var ans;
      try{
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      ans  = decodedJwtData.exp;
    }
    catch(e){
     // console.log('token_decode: ' + e);
    }
    finally{
      return ans;
    }
  }
  getCurrentTime() {

    //   return epochNow;
    return Math.round(new Date().getTime() / 1000);
  }


  async genarate_Refresh_Token_send_call(token,url,params){
    await this.genarate_Refresh_Token(token);

   return this.send_call(url,params);

  }
  async  send_call(url: string, params: object) {


    var reponse={};
   var token = this.getToken_();


    if (token == null) {
      //console.log("returntoLogin\t", "token is null");
      this.returntoLogin();

    }
    else {


      var headers = this.getHeader(token);

      var token_expiry = this.getTokenExpiry(token);
      if (token_expiry == null) {

        this.returntoLogin();
      }
      else {
        var current_time = this.getCurrentTime();

        if (current_time > token_expiry) {
         // console.log("Token Expired Before Call");
          reponse = await this.genarate_Refresh_Token_send_call(token, url,params);
         // console.log("after refresh response:", reponse);

        }
        else {
          var _data = {};
          var _error = {};



         let resp = await this.http.get(url, { headers: headers, params: params}).toPromise().then(
          //return this.http.get(url, { headers: headers, params:  params  }).subscribe(
              data => {
                _data = data;

               // console.log("inside data of send call",data);
              },
              async error => {
                _error = error;

               // console.log(_error['status']);
                if (_error['status'] == 401) {
                  current_time = this.getCurrentTime();
                  if (current_time > token_expiry) {

                   reponse = await this.genarate_Refresh_Token_send_call(token, url,params);

                  }
                  else {
                   // console.log("eder: 3_Token Invalid 401");
                    //this.returntoLogin();
                  }
                  // break;

                }
              },
      );
      if(! reponse["data"]){
      reponse = { 'data': _data, 'error': _error };
      }
        }
      }

    }
    return reponse;
  }

 send_call_t(url: string, params: object) {

    var token = this.getToken_();
    var headers = this.getHeader(token);
    let _data;
    let r = this.http.get(url, { headers: headers, params:  params  }).subscribe();

 // console.log("_data");
 // console.log(_data);

  return _data;
        }
}
