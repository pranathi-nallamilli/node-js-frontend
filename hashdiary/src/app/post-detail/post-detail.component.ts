import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AcceptDenyRequest } from '../Interface/accept-deny-request';
import { Comment } from '../Interface/comment';
import { CommentRequest } from '../Interface/comment-request';
import { Events } from '../Interface/events';
import { Post } from '../Interface/post';
import { User } from '../Interface/user';
import { EventserviceService } from '../service/eventservice.service';
import { LoginuserService } from '../service/loginuser.service';
import { PostDetailsService } from '../service/post-details.service';
import { PostapiService } from '../service/postapi.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() postApiService!: PostapiService;
  @Input() postDetailsService!: PostDetailsService;
  @Input() loginUserService!: LoginuserService;
  @Input() post!:Post;
  @Input() from:string="";
  @Input() commentForm!:FormGroup;
  @Input() loginUser!: User;
  @Input() commentRequest:CommentRequest={"commentDesc":"","userId":0};
  @Input() totalComments!: Comment[];
  @Input() event!:Events;
  @Input() isAccepted:boolean | undefined;
  acceptDenyRequest:AcceptDenyRequest={'userId':0,'eventId':0,'isAccepted':false};
  eventService:EventserviceService;
  constructor(postApiService: PostapiService,postDetailsService:PostDetailsService,loginUserService:LoginuserService,eventService:EventserviceService) { 
    this.postApiService=postApiService;
    this.postDetailsService=postDetailsService;
    this.loginUserService=loginUserService;
    this.eventService=eventService;
  }

  ngOnInit(): void {
   this.postApiService.getPostById(this.postDetailsService.getPostId()).subscribe(data=>
    {
      this.post=data;
    });
    this.eventService.getEventById(this.postDetailsService.getEventId()).subscribe(data=> {
      this.event=data;
    });
   this.from=this.postDetailsService.getFrom();
   this.loginUserService.getLoginUser().subscribe(data => { this.loginUser=data;
    console.log("loggedin user id & name "+this.loginUser?.userId+" "+this.loginUser?.fullName);
    this.eventService.getEventResponse(this.loginUser?.userId,this.postDetailsService.getEventId()).subscribe(data1=> {
      console.log("response present for this user is "+data1?.accepted);
      this.isAccepted=data1?.accepted;
    })
  })
  this.getComments();
   this.commentForm=new FormGroup(
     {
      "commentDesc": new FormControl(null),
     }
   )
  }
  postComment()
  {
    console.log("Clicking comment is "+this.commentForm.get('commentDesc')?.value);
    this.commentRequest.commentDesc=this.commentForm.get('commentDesc')?.value;
    this.commentRequest.userId=this.loginUser.userId;
    this.postApiService.addComment(this.commentRequest,this.postDetailsService.getPostId()).subscribe(data=>{
      console.log('Add comment '+data);
      this.commentForm.get('commentDesc')?.setValue("");
      this.postApiService.getComments(this.postDetailsService.getPostId()).subscribe(data1 => {
          this.totalComments=data1;
      })
        
    })
  }
  getComments()
  {
    this.postApiService.getComments(this.postDetailsService.getPostId()).subscribe(data=>{
      console.log("getting all comments for this post "+data);
      this.totalComments=data;
    })
  }
  setResponse(response:boolean)
  {
    console.log("user response "+response);
    this.isAccepted=response;
    this.acceptDenyRequest.eventId=this.postDetailsService.getEventId();
    this.acceptDenyRequest.userId=this.loginUser.userId;
    this.acceptDenyRequest.isAccepted=this.isAccepted;
    this.eventService.addEventResponse(this.acceptDenyRequest).subscribe(data=>
      {
        console.log("responsed event "+data);
      })
  }

}
