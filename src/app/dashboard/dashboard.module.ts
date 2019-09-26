import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from './stats/stats.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2FlatpickrModule,
    DashboardRoutingModule,
    NgSelectModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    DashboardHomeComponent,
    TasksComponent,
    StatsComponent,

  ]
})
export class DashboardModule { }
