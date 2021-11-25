import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  baseURL:string="http://localhost:8081/api/user";
  headers = { 'content-type': 'application/json'}
  httpClient!: HttpClient;
  router: any;

  constructor(private http: HttpClient) { }

  registerUser(userName: String,
    fullName: String,
    contactNumber: String,
    password: String,
    email: String,
    address : String,
    birthday: string,
    joiningDate: string,
    roleDetail: String
    )
  {
    console.log(' joining date '+joiningDate+' birthdate '+birthday);
    birthday=this.convertDateInEventAPIFormat(birthday);
    joiningDate=this.convertDateInEventAPIFormat(joiningDate);
      return this.http.post(this.baseURL+`/add-user`, {userName: userName,
        fullName: fullName,
        contactNumber: contactNumber,
        password: password,
        email: email,
        address : address,
        dateOfBirth: birthday,
        dateOfJoining: joiningDate,
        roleName: roleDetail
      })
  }
  convertDateInEventAPIFormat(date:string):string
  {
    let dates=date.split('-');
    return dates[2]+"-"+dates[1]+"-"+dates[0];
  }
}

