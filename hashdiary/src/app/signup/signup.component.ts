import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../model/user';
import { RegisterUserService } from '../service/register-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm= new FormGroup({
  })

  user!: User;


    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private registerUserService: RegisterUserService,
       // private userService: UserService,
    ) {}

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
          userName: ['', Validators.required],
          fullName: ['', Validators.required],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
          contactNumber: ['', Validators.required],
          email: ['', [Validators.required , Validators.email]  ],
          address: ['', Validators.required, Validators.minLength(10), Validators.maxLength(100)],
          birthday : ['', Validators.required],
          joiningDate: ['', Validators.required],
          roleDetail: ['', Validators.required],
      },
      {
        //validator: MustMatch('password', 'confirmPassword')
      });
  }

  get f() { return this.registerForm.controls; }

  registerUser()
  {
   this.registerUserService.registerUser(this.registerForm.get('userName')?.value,
   this.registerForm.get('fullName')?.value,
   this.registerForm.get('contactNumber')?.value,
   this.registerForm.get('password')?.value,
   this.registerForm.get('email')?.value,
   this.registerForm.get('address')?.value,
   this.registerForm.get('birthday')?.value,
   this.registerForm.get('joiningDate')?.value,
   this.registerForm.get('roleDetail')?.value,
   )

            .pipe(first())
            .subscribe(
              (                data: any) => {
                    this.router.navigate(['/login']);
                },
              (                error: any) => {

                    this.loading = false;
                });
              }
}
