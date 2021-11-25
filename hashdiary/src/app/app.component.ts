import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { User } from './model/user';
import { LoginuserService } from './service/loginuser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hashdiary';
  loginUserService : LoginuserService;
  data !: Data;
  isloggedin !: boolean;

  constructor( loginUserService : LoginuserService){
    this.loginUserService=loginUserService;
  }

  ngOnInit(): void {

  }

  isUserLoggedIn()
  {
    console.log("SET "+this.loginUserService.isLogin);
    this.isloggedin=this.loginUserService.isUserLoggedin();
    return this.isloggedin;
  }


}
