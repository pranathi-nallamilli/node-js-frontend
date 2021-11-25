import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../Interface/comment';
import { CommentRequest } from '../Interface/comment-request';
import { EventRequestPost } from '../Interface/event-request-post';
import { GeneralPostRequest } from '../Interface/general-post-request';
import { Post } from '../Interface/post';

@Injectable({
  providedIn: 'root'
})
export class PostapiService {
  baseURL: string = "http://localhost:8084/api/post";
  headers = { 'content-type': 'application/json' }
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) { this.httpClient = httpClient; }
  getPosts(type: String): Observable<any> {
    console.log("getting post for " + type);
    return this.httpClient.get<Post[]>(this.baseURL + '/get-post-by-type/' + type, { 'headers': this.headers });
  }
  addGeneralPost(postGeneral : GeneralPostRequest) : Observable<any>
  {

    console.log("adding post "+postGeneral);
    return this.httpClient.post<any>(this.baseURL + '/add-post-general',postGeneral,{'headers':this.headers});
  }
  addEventPost(postEvent : EventRequestPost) : Observable<any>
  {
    console.log("adding post "+postEvent);
    return this.httpClient.post<any>(this.baseURL + '/add-post-for-event',postEvent,{'headers':this.headers});
  }
  getPostById(id:number) :Observable<Post>
  {
    console.log("adding post "+id);
    return this.httpClient.get<Post>(this.baseURL + '/get-post-by-id/'+id,{'headers':this.headers});
  }
  addComment(commentRequest : CommentRequest,id:number):Observable<any>
  {
    return this.httpClient.post<any>(this.baseURL+"/"+id+"/comment",commentRequest,{'headers':this.headers});
  }
  getComments(id:number) :Observable<Comment[]>
  {
    return this.httpClient.get<Comment[]>(this.baseURL+"/"+id+"/comment",{'headers':this.headers});
  }
}
