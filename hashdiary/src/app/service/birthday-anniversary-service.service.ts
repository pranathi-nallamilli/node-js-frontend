import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Interface/user';
import { DateRequestInterface } from '../Interface/date-request-interface';
@Injectable({
  providedIn: 'root'
})
export class BirthdayAnniversaryServiceService {
  baseURL:string="http://localhost:8081/api";
  headers = { 'content-type': 'application/json'}
  httpClient : HttpClient;
  constructor(httpClient : HttpClient) { this.httpClient=httpClient;}
  getBirthdayUsers(daterequest : DateRequestInterface): Observable<any>
  {
    console.log("getting todays birthdate: "+daterequest.fromDate);
    const dateBirthdayBody = JSON.stringify(daterequest);
    console.log(dateBirthdayBody);
    return this.httpClient.post(this.baseURL + '/user/get-birth-dates', dateBirthdayBody,{'headers':this.headers});
    }
  getJoiningUsers(daterequest : DateRequestInterface): Observable<any>
  {
    console.log("getting todays Joining: "+daterequest.fromDate);
    const dateJoiningBody = JSON.stringify(daterequest);
    console.log(dateJoiningBody);
    return this.httpClient.post(this.baseURL + '/user/get-joining-dates', dateJoiningBody,{'headers':this.headers});
    }
}
