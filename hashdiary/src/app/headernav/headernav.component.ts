import { Component, Input, OnInit } from '@angular/core';
import { LoginuserService } from '../service/loginuser.service';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.css']
})
export class HeadernavComponent implements OnInit {
  @Input() type:string="";
  @Input() loginService: LoginuserService;
  constructor( loginService: LoginuserService) {
    this.loginService=loginService;
  }
  setLogout()
  {
    this.loginService.isLogin=false;
  }
  ngOnInit(): void {
  }
  setType(type:string)
  {
    this.type=type;
  }
   getStyle():string
   {
   return "";
   }
}
