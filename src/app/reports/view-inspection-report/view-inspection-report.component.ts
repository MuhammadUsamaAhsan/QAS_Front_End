import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-inspection-report',
  templateUrl: './view-inspection-report.component.html',
  styleUrls: ['./view-inspection-report.component.scss']
})
export class ViewInspectionReportComponent implements OnInit  {
dtOptions:any={};
  private reports=[];
  showTable:boolean=true;

  // clickMessage="this is uzairrr";
  // k(){
  //   alert(this.clickMessage);
  // }
    //dtOptions: DataTables.Settings = {};

    constructor(private http: HttpClient,private router:Router) { }

    ngOnInit() {


        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,

          scrollY:400,

          processing: true,
          dom: 'Bfrtip',
          // Configure the buttons
          buttons: [

            'copy',
            'print',
            'excel',


          ],
        };








      var data= new FormData();
      var url = 'http://172.19.60.50:8088/api/Fabrics/ViewInspectionReport';
       this.showTable=false;

      return this.http.get<any>(url)
         // .pipe(map((data: any) => data))
          .subscribe(
                data => {

                this.reports = data['report'];
                //this.users=[];
              setTimeout(()=>{this.showTable = true}, 0);
                //}

                  console.log(data);

                },
                error => {
                    console.log("Error", error);
                }
            );

          };
        }



