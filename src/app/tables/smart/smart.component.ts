import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html'
})
export class SmartComponent implements OnInit {
//   title='uzair';

//   dtOptions: DataTables.Settings = {};
//   data = [
//     ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
//     ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
//   ];
//   renderer: any;
//   router: any;

//   constructor() { }

//   ngOnInit() {
//     this.dtOptions = {
//       data: this.data,
//       columns: [
//         { title: 'Name' },
//         { title: 'Position' },
//         { title: 'Office' },
//         { title: 'Extn' },
//         { title: 'Start Date' },
//         { title: 'Salary' },
//         {
//           title: 'action', render: (data: any, type: any, full: any) => {
//             return this.newMethod();
//           }
//         }
//       ]
//     };
//   }


//   private newMethod(): any {
//       return '<button id="edit" (click)="clickMe()" class="btn  btn-just-icon btn-round btn-light"><i class="material-icons">edit</i></button>';
//   }

k(){
  alert('uzairrrrrrrrrr');
}


title = 'JSON to Table Example';
  constructor (private httpService: HttpClient) { }
  arrBirds: string [];

  ngOnInit () {
    // this.httpService.get('./assets/birds.json').subscribe(
    //   data => {
    //     this.arrBirds = data as string [];	 // FILL THE ARRAY WITH DATA.
    //     //  console.log(this.arrBirds[1]);
    //   },
      
    // );
  }
  clickMe(){
    this.httpService.get('./assets/birds.json').subscribe(
      data => {
        this.arrBirds = data as string [];	 // FILL THE ARRAY WITH DATA.
         console.log(this.arrBirds);
      },
      
    );

  }



 


}