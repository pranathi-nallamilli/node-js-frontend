import { HttpClient } from '@angular/common/http';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, config, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})

export class LoginuserService

{
  baseURL:string="http://localhost:8081/api/user";
  headers = { 'content-type': 'application/json'}
  httpClient : HttpClient;
  loginUser !: User;
  isLogin !: boolean;
  userName!: String;

  constructor(httpClient : HttpClient) { this.httpClient=httpClient;}

  login(username: any, password: any) {

    return this.httpClient.post<any>(this.baseURL+`/login`, { userName : username, password : password })
        .pipe(map((user: User) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.loginUser=  user;
            this.isLogin= true;
            this.userName=this.loginUser?.userName;
            return user;
        }));
}


  getLoginUser(): Observable<any>
  {
    console.log("loggedin user name & role "+this.loginUser?.roleDetail+" "+this.loginUser?.fullName);
    return this.httpClient.get<User>(this.baseURL + '/get-user-by-name?userName='+this.loginUser?.userName,{'headers':this.headers});
  }

  isUserLoggedin()
  {
    return this.isLogin;

  }

  updateUserData(userDetails: any): Observable<any> {
    return this.httpClient.post<User>(this.baseURL + '/update-user', userDetails, { 'headers': this.headers });
  }

  logoutUser() {
        this.isLogin= false;
        }

      }
