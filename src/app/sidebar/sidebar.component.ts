import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { AuthenticationService } from '../Services/authentication.service';
import { SomeSharedService } from '../globals/globals.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ SomeSharedService ]
})
export class SidebarComponent implements OnInit {

  modules:any;
  dashboard:any=[];
  fabric:any=[];
  user:any=[];
  rights:any;
  audit:any=[];
  finishing:any=[];
  packing:any=[];
  sidebarItems:any=[];
  cut_to_ship:any=[];
  trims_Sundaries:any=[];


  constructor(public cmnSrv: CommonService,private authenticationService: AuthenticationService,private someSharedService: SomeSharedService) {  }

   ngOnInit(){

    this.modules=this.authenticationService.SetModuleRights(this.authenticationService.getToken());
    //console.log(this.modules);
    this.modules=JSON.parse(  this.modules );
   this.sidebarArray();

  }
  // async FetchModules(){

  //   const url = 'http://babar515-001-site1.gtempurl.com/api/Module';
  //   let params=null;

  //   let response=await this.authenticationService.send_call(url,params);

  //   if(response['data']){
  //     if(response['data']['_body']){
  //       if(response['data']['_body'].length>0)
  //       {
  //         const a=JSON.parse(response['data']['_body']);
  //         this.modules=a['modules'];

  //         console.log("Modules:",this.modules);
  //             this.sidebarArray();

  //       }
  //       else{
  //       }
  //     }   else{

  //       //console.log("_body empty");
  //      // this.notifier.notify('error','No Data Found!!!');
  //     }

  //   }
  //   else
  //   {

  //   }
  // }


sidebarArray(){

this.audit=[{
  label: 'Audit',googleicon:'fa fa-edit',subItem: [
{link: '/audit/view-audit', label: 'View Audit',icon:'V'},
// {link: '/user/edit', label: 'Edit', icon: 'EU'},
//{link: '/user/view', label: 'View',icon:'V-U'},
]}];

  this.finishing=[{
    label: 'Finishing',googleicon:'fa fa-fighter-jet',subItem: [
  {link: '/finishing/view-finishing', label: 'View Finishing',icon:'V'},
  // {link: '/user/edit', label: 'Edit', icon: 'EU'},
  //{link: '/user/view', label: 'View',icon:'V-U'},
  ]}];
  this.packing=[{
    label: 'Packing',googleicon:'fa fa-cube',subItem: [
  {link: '/packing/add-packing', label: 'Add Packing',icon:'V'},
  {link: '/packing/view-packing', label: 'View Packing',icon:'V'},
  // {link: '/user/edit', label: 'Edit', icon: 'EU'},
  //{link: '/user/view', label: 'View',icon:'V-U'},
  ]}];

  this.cut_to_ship=[{
    label: 'Cut to Ship',googleicon:'fa fa-fighter-jet',subItem: [
  {link: '/cut-to-ship/view-cut-to-ship', label: 'View Cut to Ship',icon:'V'},
  // {link: '/user/edit', label: 'Edit', icon: 'EU'},
  //{link: '/user/view', label: 'View',icon:'V-U'},
  ]}];


this.trims_Sundaries=[{
  label: 'Trims and Sundries',googleicon:'fa fa-user',subItem: [

      {link: '/trim-and-sundries/add-accessory', label: 'Add Accessory',icon:'A-A'},
      {link: '/trim-and-sundries/view-accessories', label: 'View Accessories',icon:'V-A'},

      {link: '/supplier/add-supplier', label: ' Add-Supplier',icon:'A-S'},
     // {link: '/supplier/edit-supplier', label: 'Edit-Supplier', icon: 'ES'},
      {link: '/supplier/view-supplier', label: 'View-Supplier',icon:'V-S'},

]}];

  this.fabric=[  {label: 'Inputs',googleicon:'fa fa-sign-in', subItem:  [

    { label: 'Fabric Inputs' , subItem: [

        { label:'Reports', subItem: [
             {link: '/reports/view-fabric-supplier', label: 'Supplier Wise Fabric'},
             {link: '/reports/view-fabric-article', label: 'No of Articles Summary'},
             {link: '/reports/view-top-ten-articles', label: 'Top 10 Articles'},
             //{link: '/reports/view-inspection-report', label: 'Inspection Report', icon: 'IR'},
             {link: '/reports/view-inspection-quality', label: 'Marking Efficiency'},
             {link: '/reports/view-fabric-defects-point-score', label: 'Defect Point Count'},
             {link: '/reports/supplier-wise-articles', label: 'Supplier Wise Articles'},
             {link: '/reports/view-supplier-orders-monthly', label: 'Supplier Orders Monthly'},
             {link: '/reports/article-customer-summary', label: 'Article Customer Summary',},
            // {link: '/reports/print-function', label: 'print function',},
    ]}
   ,

   { label: 'Manage-Orders', subItem: [
       {link: '/manage-orders/add-order', label: ' Add-Order'},
     // {link: '/manage-orders/edit-order', label: 'Edit-Order', icon: 'EO'},
       {link: '/manage-orders/view-order', label: 'View-Order'}
      ]},

      { label: 'Manage-Rolls', subItem: [
       {link: '/manage-rolls/add-roll', label: ' Add-Roll' },
      // {link: '/manage-rolls/edit-roll', label: 'Edit ROll', icon: 'ER'},

       {link: '/manage-rolls/view-roll', label: 'View-Roll'}
      ]},
      //Fabric forms
   { label: 'Fabrics' , subItem: [
     {link: '/fabric/add-fabric', label: 'Add-Fabric'},
    // {link: '/fabric/edit-fabric', label: 'Edit-fabric',icon:'DF'},

     {link: '/fabric/view-fabric', label: 'View-Fabric'},

   ]},

   //Supplier forms
   { label: 'Supplier', subItem: [
     {link: '/supplier/add-supplier', label: ' Add-Supplier'},
    // {link: '/supplier/edit-supplier', label: 'Edit-Supplier', icon: 'ES'},

     {link: '/supplier/view-supplier', label: 'View-Supplier'}
    ]},

    {
      label: 'Lab-Testing',subItem: [
      {link: '/lab-testing/three-home-laundry', label: 'Add-3HL'},
      {link: '/lab-testing/view-three-home-laundary', label: 'View-3HL'},
      {link: '/lab-testing/standard-wash', label: 'Add-Standard-Wash'},
      {link: '/lab-testing/view-standard-wash', label: 'View-Standard-Wash'},

 ]},
   ]}
   //,
 ]}];
this.dashboard=[ {label: 'Dashborad', googleicon:'fa fa-th' ,subItem:[
  {link: '/dashboard/dashboard-home', label: 'Fabric', icon: 'f'},
// {link: '/components/grids', label: 'grid System', icon: 'gs'},
// {link: '/components/panels', label: 'panels', icon: 'p'},
// // {link:'/components/alerts',label:'alerts',icon:'a'},
// // {link:'/components/notifications',label:'notifications',icon:'n'},
// {link: '/components/icons', label: 'icons', icon: 'i'},
// {link: '/components/typography', label: 'typography', icon: 't'},

]}];

this.user=[ {
label: 'User',googleicon:'fa fa-user',subItem: [
{link: '/user/add', label: 'add', icon:'A-U'},
// {link: '/user/edit', label: 'Edit', icon: 'EU'},
{link: '/user/view', label: 'View',icon:'V-U'},
]}];


// this.modules=[
//   {Id: 1, Name: "Fabric"},
//   {Id: 2, Name: "Dashboard"}
// ];


//var skinName = this.modules.find(x=>x.Name == "Dashboard").Id;
//console.log("dashboard",skinName);

//console.log(this.modules)
this.rights=[this.authenticationService.GetUserRights()];

  //this.rights=JSON.parse("[" +  this.authenticationService.GetUserRights() + "]");
  this.rights=JSON.parse("[" +  this.rights + "]");

 // console.log("mod",this.modules);

  // this.is_super_admin=this.authenticationService.is_Super_admin();
//console.log(this.dashboard);
  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "Dashboard").id) ){
    this.sidebarItems.push(this.dashboard[0]);
   // console.log(this.sidebarItems);


  }
  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "Fabric").id) ){
    this.sidebarItems.push(this.fabric[0]);

  //  console.log(this.fabric);


  }

  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "Accessories").id) ){
    this.sidebarItems.push(this.trims_Sundaries[0]);
   // console.log(this.sidebarItems);


  }


  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "Finishing").id) ){
    this.sidebarItems.push(this.finishing[0]);
   // console.log(this.sidebarItems);


  }
  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "Packing").id) ){
    this.sidebarItems.push(this.packing[0]);
   // console.log(this.sidebarItems);


  }


  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "Cut to Ship").id) ){
    this.sidebarItems.push(this.cut_to_ship[0]);
   // console.log(this.sidebarItems);


  }
  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "Audit").id) ){
    this.sidebarItems.push(this.audit[0]);
   // console.log(this.sidebarItems);


  }

  if(this.dashboard && this.rights.includes(this.modules.find(x=>x.module== "User").id) ){
    this.sidebarItems.push(this.user[0]);



  }

}
}
