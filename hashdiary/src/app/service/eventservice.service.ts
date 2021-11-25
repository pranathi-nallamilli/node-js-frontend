import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcceptDenyRequest } from '../Interface/accept-deny-request';
import { AddEventRequest } from '../Interface/add-event-request';
import { DateRequestInterface } from '../Interface/date-request-interface';
import { Events } from '../Interface/events';

@Injectable({
  providedIn: 'root'
})
export class EventserviceService {
  
  baseURL:string="http://localhost:8700/api/event";
  headers = { 'content-type': 'application/json'};
  httpClient : HttpClient;
  constructor(httpClient : HttpClient) { this.httpClient=httpClient;}
  addEvent(eventRequest : AddEventRequest):Observable<any>
  {
    return this.httpClient.post<any>(this.baseURL + '/addEvent',eventRequest,{'headers':this.headers});
  }
  getEventsByDates(dateRequest : DateRequestInterface) : Observable<Events[]>
  {
    return this.httpClient.post<Events[]>(this.baseURL+'/get-events-dates',dateRequest,{'headers':this.headers});
  }
  getEventById(id:number): Observable<Events>
  {
    return this.httpClient.get<Events>(this.baseURL+'/get-event-by-id/'+id,{'headers':this.headers});
  }
  addEventResponse(response: AcceptDenyRequest):Observable<any>
  {
    return this.httpClient.post<any>(this.baseURL+"/accept-deny",response,{'headers':this.headers});
  }
   getEventResponse(userId: number,eventId:number):Observable<any>
  {
     return this.httpClient.get<any>(this.baseURL+"/get-accept-deny/"+userId+"/"+eventId,{'headers':this.headers});
   }
}
