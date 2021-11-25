
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginuserService } from '../service/loginuser.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
   })
export class LoginComponent implements OnInit {

    loginForm= new FormGroup({
      })
      returnUrl!: '/dashboard';

    loading = false;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private loginuserService : LoginuserService,){

      }
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          userName: ['', Validators.required],
          password: ['', Validators.required]
      });
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'

    }


    get f() { return this.loginForm.controls; }


    loginUser(){
      this.loginuserService.login(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value)
            .pipe(first())
            .subscribe(
              (                data: any) => {
                this.router.navigate(['/dashboard']);
                },
              (                error: any) => {
                    this.loading = false;
                });


    }
}
