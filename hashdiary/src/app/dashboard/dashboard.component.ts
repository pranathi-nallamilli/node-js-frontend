import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BirthdayAnniversaryServiceService } from '../service/birthday-anniversary-service.service';
import { DateRequestInterface } from '../Interface/date-request-interface';
import { User } from '../Interface/user';
import { Events } from '../Interface/events';
import { EventserviceService } from '../service/eventservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() todayBirthdaysUsers: User[]=[];
  @Input() todayAnniversaryUsers:User[]=[];
  @Input() totalEvents: Events[]=[];
  birthdayAnniversaryService : BirthdayAnniversaryServiceService;
  eventsService : EventserviceService;
  dateRequest :DateRequestInterface={fromDate:"",toDate:""};
  currentdate:string="";
  constructor(birthdayAnniversaryService : BirthdayAnniversaryServiceService, eventsService : EventserviceService) {
    this.birthdayAnniversaryService=birthdayAnniversaryService;
    this.eventsService=eventsService;
   }

  ngOnInit(): void {
    let currentdate = new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
    console.log("getting date "+currentdate);
    this.dateRequest.fromDate=currentdate;
    this.dateRequest.toDate=currentdate;
    this.birthdayAnniversaryService.getJoiningUsers(this.dateRequest).subscribe(data => {
      console.log("Joining Data "+data)
      this.todayAnniversaryUsers=data;
    });
    this.birthdayAnniversaryService.getBirthdayUsers(this.dateRequest).subscribe(data => {
      console.log("Birthday Data "+data)
      this.todayBirthdaysUsers=data;
    });
    this.eventsService.getEventsByDates(this.dateRequest).subscribe(data => {
      console.log("Events data "+data);
      this.totalEvents=data;
    }
    )
    
  }
  getCurrDate():string {
    return new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
  }

}
