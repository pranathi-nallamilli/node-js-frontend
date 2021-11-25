import { Component, Input, OnInit } from '@angular/core';
import { Events } from '../Interface/events';
import { User } from '../Interface/user';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.css']
})
export class UpcomingEventsComponent implements OnInit {
  @Input() type:string="";
  @Input() count:number=0;
  @Input() from:string="";
  @Input() totalUsers: User[]=[];
  @Input() totalEvents: Events[]=[];
  constructor() { 
    
  }

  ngOnInit(): void {
  }
  getBirthdayAnniversaryDate(date:string)
  {
    let dates=date.split("-");
    return dates[0]+"-"+dates[1]+"-"+new Date().getFullYear();
  }

}
