import { Component, Input, OnInit } from '@angular/core';
import { DateRequestInterface } from '../Interface/date-request-interface';
import { Post } from '../Interface/post';
import { User } from '../Interface/user';
import { BirthdayAnniversaryServiceService } from '../service/birthday-anniversary-service.service';
import { PostDetailsService } from '../service/post-details.service';
import { PostapiService } from '../service/postapi.service';

@Component({
  selector: 'app-birthday-work-anniversary',
  templateUrl: './birthday-work-anniversary.component.html',
  styleUrls: ['./birthday-work-anniversary.component.css']
})
export class BirthdayWorkAnniversaryComponent implements OnInit {
  @Input() type :string="birthday";
  @Input() title :string="Birthdays" 
  @Input() totalposts: Post[]=[];
  postService : PostapiService;
  birthdayAnniversaryService : BirthdayAnniversaryServiceService;
  dateRequest : DateRequestInterface={fromDate:"",toDate:""};
  postDetailsService: PostDetailsService;
  upcomingAnniversaryUsers:User[]=[];
  upcomingBirthdaysUsers: User[]=[];
  constructor(postService: PostapiService,birthdayAnniversaryService:BirthdayAnniversaryServiceService,postDetailsService: PostDetailsService) {
     this.postService=postService;
     this.birthdayAnniversaryService=birthdayAnniversaryService;
     this.postDetailsService=postDetailsService;
   }

  ngOnInit(): void {
    let startdate:string = this.getInDDMMYYYYformat(new Date(new Date().setDate(new Date().getDate() + 1)));
    let enddate:string   = this.getInDDMMYYYYformat(new Date(new Date().setDate(new Date().getDate() + 2)));
    console.log("date range "+startdate+"  "+enddate);
    this.dateRequest.fromDate=startdate;
    this.dateRequest.toDate=enddate;
    this.birthdayAnniversaryService.getJoiningUsers(this.dateRequest).subscribe(data => {
      console.log("Joining Data "+data)
      this.upcomingAnniversaryUsers=data;
    });
    this.birthdayAnniversaryService.getBirthdayUsers(this.dateRequest).subscribe(data => {
      console.log("Birthday Data "+data)
      this.upcomingBirthdaysUsers=data;
    });
    let tab_type=this.postDetailsService.getType();
    if(tab_type !="" && tab_type=="Birthday")
    {
       this.type='birthday';
    }
    else if(tab_type !="" && tab_type=="Anniversary")
    {
        this.type='anniversary';
    }
    this.getposts(this.type);
  }
  getposts(type:string)
  {
    if(type == "birthday")
    {
      this.title="Birthdays";
    }
    else
    {
      this.title="Work Anniversaries"
    }
    this.type=type;
    this.postService.getPosts(this.type).subscribe(data => {
    console.log("posts data "+data)

    this.totalposts=data;
    })
  }
  getInDDMMYYYYformat(date: Date):string{
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
  }
}
