import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core'

@Injectable()
export class SomeSharedService {
  public ip = 'babar515-001-site1.gtempurl.com';
 // public ip = '192.168.1.106:5002';
  public port='8088'
}
@Component({
  selector: 'app-globals',
  templateUrl: './globals.component.html',
  styleUrls: ['./globals.component.scss']
})
export class GlobalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
