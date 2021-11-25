import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {
  @Input() postId:number=0;
  @Input() from:string="";
  @Input() eventId:number=0;
  @Input() type:string="";
  constructor() { }
  setDetails(postId:number,from:string,eventId:number)
  {
    this.eventId=eventId;
    this.postId=postId;
    this.from=from;
  }
  setType(type:string)
  {
    this.type=type;
  }
  getType():string
  {
    return this.type;
  }
  getPostId():number
  {
    return this.postId;
  }
  getEventId():number
  {
    return this.eventId;
  }
  getFrom():string
  {
    console.log("getting post from "+this.from)
    return this.from;
  }
}
