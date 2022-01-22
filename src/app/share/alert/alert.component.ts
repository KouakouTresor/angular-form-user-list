import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() type: string;

  cssClass: string[] = ['alert', 'alert-dismissible', 'fade'];
  constructor() { }

  ngOnInit(): void {
    const alertTypeClass = {
      success: 'alert-success',
      danger: 'alert-danger',
      info: 'alert-info',
      warning: 'alert-warning',
    }; 
    this.cssClass.push(alertTypeClass[this.type]);
  }

  removeAlert(){
    this.cssClass = ['alert-hide']
  }

}
