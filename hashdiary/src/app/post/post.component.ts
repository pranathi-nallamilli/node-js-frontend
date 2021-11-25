import { Component, Input, OnInit } from '@angular/core';
import { DateRequestInterface } from '../Interface/date-request-interface';
import { Post } from '../Interface/post';
import { User } from '../Interface/user';
import { LoginuserService } from '../service/loginuser.service';
import { PostapiService } from '../service/postapi.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() type :string="general";
  @Input() title :string="Posts" 
  @Input() totalposts: Post[]=[];
  postService : PostapiService;
  loginUser : User | undefined;
  loginUserService : LoginuserService;

  constructor(postService: PostapiService,loginUserService : LoginuserService) {
     this.postService=postService;
     this.loginUserService=loginUserService; 
   }

  ngOnInit(): void {
    this.getPosts();
    this.loginUserService.getLoginUser().subscribe(data => { this.loginUser=data;})
    console.log("loggedin user name & role "+this.loginUser?.roleDetail+" "+this.loginUser?.fullName);
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
