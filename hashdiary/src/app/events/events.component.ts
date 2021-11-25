import { Component, Input, OnInit } from '@angular/core';
import { DateRequestInterface } from '../Interface/date-request-interface';
import { Events } from '../Interface/events';
import { Post } from '../Interface/post';
import { User } from '../Interface/user';
import { EventserviceService } from '../service/eventservice.service';
import { LoginuserService } from '../service/loginuser.service';
import { PostapiService } from '../service/postapi.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input() type :string="event";
  @Input() title :string="Posts" 
  @Input() totalposts: Post[]=[];
  postService : PostapiService;
  dateRequest : DateRequestInterface={fromDate:"",toDate:""};
  loginUser : User | undefined;
  loginUserService : LoginuserService;
  totalEvents:Events[]=[];
  eventService!:EventserviceService;



  constructor(postService: PostapiService,loginUserService : LoginuserService,eventService:EventserviceService) {
     this.postService=postService;
     this.loginUserService=loginUserService;
     this.eventService=eventService;
   }

  ngOnInit(): void {
    let startdate:string = this.getInDDMMYYYYformat(new Date(new Date().setDate(new Date().getDate() + 1)));
    let enddate:string   = this.getInDDMMYYYYformat(new Date(new Date().setDate(new Date().getDate() + 7)));
    console.log("date range "+startdate+"  "+enddate);
    this.dateRequest.fromDate=startdate;
    this.dateRequest.toDate=enddate;
    this.getPosts();
    this.loginUserService.getLoginUser().subscribe(data => { this.loginUser=data;})
    console.log("loggedin user name & role "+this.loginUser?.roleDetail+" "+this.loginUser?.fullName)
    this.eventService.getEventsByDates(this.dateRequest).subscribe(data => {
      this.totalEvents=data;
    })
  }

  getInDDMMYYYYformat(date: Date):string{
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
  }
  getPosts() : Post[]
  { 
    this.postService.getPosts(this.type).subscribe(data => {
      console.log("posts data "+data)
  
      this.totalposts=data;
      });
    return this.totalposts;
  }
  getStyle():string
  {
      if(this.loginUser?.roleDetail=='HR')
        return "dashboard-hr-post";
      else
        return "dashboard-normal-post";
  }

}
