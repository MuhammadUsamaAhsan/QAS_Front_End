//import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NotifierModule } from 'angular-notifier';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GlobalsComponent } from './globals/globals.component';
import { Ng5SliderModule } from 'ng5-slider';
import { HttpModule } from '@angular/http';
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';
//import { NgxCheckboxModule } from 'ngx-checkbox';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { Injectable } from '@angular/core';

export const ip='localhost';

@NgModule({
  declarations: [
    AppComponent,
    GlobalsComponent,
    LoginComponent


  ],
  imports: [
    HttpModule,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    AngularFontAwesomeModule,
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circleSwish,
      fullScreenBackdrop: true}),
     // NgxCheckboxModule,
    // MDBBootstrapModule,
    
    NotifierModule.withConfig({
      position: {

        horizontal: {

          /**
           * Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'right',

          /**
           * Defines the horizontal distance to the screen edge (in px)
           * @type {number}
           */
          distance: 20


        },

        vertical: {

          /**
           * Defines the vertical position on the screen
           * @type {'top' | 'bottom'}
           */
          position: 'top',

          /**
           * Defines the vertical distance to the screen edge (in px)
           * @type {number}
           */
          distance: 20

          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           * @type {number}
           */
          //gap: 10

        }

      }
    })




  ],
  //providers: [DatePipe],
  providers: [DatePipe,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
