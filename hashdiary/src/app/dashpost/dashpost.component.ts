import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../Interface/post';
import { User } from '../Interface/user';
import { PostDetailsService } from '../service/post-details.service';

@Component({
  selector: 'app-dashpost',
  templateUrl: './dashpost.component.html',
  styleUrls: ['./dashpost.component.css']
})
export class DashpostComponent implements OnInit {
   @Input() title : string="";
   @Input() type : string="";
   @Input() totalusers: User[]=[];
   @Input() post: any;
   @Input() postDate: string=new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear();
   @Input() from:string="dashboard";
   @Input() postDetailsService: PostDetailsService | undefined;
  constructor(postDetailsService: PostDetailsService) {
   // this.currentDate=
   this.postDetailsService=postDetailsService;
   }

  ngOnInit(): void {
  }
  getPostDetail(postId : number,eventId: number,from:string)
  {
    console.log("calling post detail service for post id "+postId+" event Id "+eventId+" from "+from);
    this.postDetailsService?.setDetails(postId,from,eventId);
  }
  setType()
  {
    this.postDetailsService?.setType(this.type);
  }

}
