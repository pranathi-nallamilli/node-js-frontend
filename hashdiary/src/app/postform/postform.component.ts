import { GeneratedFile } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEventRequest } from '../Interface/add-event-request';
import { EventRequestPost } from '../Interface/event-request-post';
import { GeneralPostRequest } from '../Interface/general-post-request';
import { EventserviceService } from '../service/eventservice.service';
import { PostapiService } from '../service/postapi.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {
   @Input() from: string="";
   @Input() isPublishedPost: boolean=false;
   @Input() postForm!:FormGroup;
   @Input() postTitleLabel:string ="Title";
   @Input() postTitlePlaceHolder:string ="Title";
   @Input() postDescriptionLabel:string = "Description";
   @Input() postDescriptionPlaceHolder:string="Describe about this post" ;
   @Input() link:string="";
   @Input() postApiService: PostapiService;
   @Input() postgeneral : GeneralPostRequest={"postTitle":"","description":"","imgUrl":"","postByUserId":100,"postType":""};
   @Input() eventRequest: AddEventRequest={   "eventHeader":"","eventDesc":"","organiserEmail": "","eventStartDate": "","imageUrl":""};
   @Input() eventPostRequest: EventRequestPost={"postTitle":"","description":"","imgUrl":"","postByUserId":"","eventId":"","postType":""}
   @Input() eventService: EventserviceService;
  constructor(postApiService : PostapiService,eventService: EventserviceService) { 
  this.postApiService = postApiService;
  this.eventService = eventService;
  }

  ngOnInit(): void {
    this.postForm=new FormGroup({
      "postTitle": new FormControl(null),
      "postDescription":new FormControl(null),
      "eventDate": new FormControl(null),
      "organizerEmail" : new FormControl(null,Validators.email)
    });
  }
  getComponent():string
  {
    console.log("from "+this.from)
    if(this.from=='event')
    {
      this.link="/events";
    }
    else
    {
      this.link="/posts";
    }
    return this.link;
  }
  setPost()
  {
     if(this.from !='event')
     { 
       console.log("postTitle "+this.postForm.get("postTitle")?.value); 
       this.postgeneral.postTitle =  this.postForm.get("postTitle")?.value;
       this.postgeneral.description =  this.postForm.get("postDescription")?.value;
       this.postgeneral.imgUrl="assets/images/couple.jpg";
       this.postgeneral.postByUserId=100;
       this.postgeneral.postType="general";
       this.postApiService.addGeneralPost(this.postgeneral).subscribe(data=>
        {
          console.log("posted data =>"+data);
        });
     }
     else if (this.from =='event')
     {
      
      console.log("event name "+this.postForm.get("postTitle")?.value+" event date"+this.convertDateInEventAPIFormat(this.postForm.get('eventDate')?.value)); 
      this.eventRequest.eventHeader=this.postForm.get("postTitle")?.value;
      this.eventRequest.eventDesc=this.postForm.get("postDescription")?.value;
      this.eventRequest.imageUrl="assets/images/sports_event.png";
      this.eventRequest.eventStartDate=this.convertDateInEventAPIFormat(this.postForm.get('eventDate')?.value);
      this.eventRequest.organiserEmail=this.postForm.get('organizerEmail')?.value;
      this.eventService.addEvent(this.eventRequest).subscribe(data=>{
        console.log("event data "+data.eventId);
        if(data!=null && data !=undefined)
        {
          this.eventPostRequest.postTitle=this.postForm.get("postTitle")?.value;
          this.eventPostRequest.description=this.postForm.get("postDescription")?.value;
          this.eventPostRequest.imgUrl=this.eventRequest.imageUrl;
          this.eventPostRequest.postByUserId="100";
          this.eventPostRequest.postType="event";
          this.eventPostRequest.eventId=data.eventId;
          this.postApiService.addEventPost(this.eventPostRequest).subscribe(data1=>{
            console.log("data for post "+data1);
          });
        }
      })
     
    }
  }
  convertDateInEventAPIFormat(date:string):string
  {
    let dates=date.split('-');
    return dates[2]+"-"+dates[1]+"-"+dates[0];
    
  }

}
