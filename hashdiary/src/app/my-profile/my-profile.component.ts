import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../Interface/user';
import { LoginuserService } from '../service/loginuser.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  userService: LoginuserService;
  loginUser: User | undefined;
  myProfileForm!: FormGroup;
  @Input() userName?: string = '';
  isEdit: boolean = false;

  constructor(userService: LoginuserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.getLoginUser().subscribe(data => {
      this.loginUser = data;
      console.log(this.loginUser);
      this.udpateUserDetails();
    }, error => {
      console.log(error);
      Swal.fire('Error', 'Error loading data', 'error');
    })
    console.log("loggedin user name & role " + this.loginUser?.roleDetail + " " + this.loginUser?.fullName);
    this.userName = this.loginUser?.userName as string;

    console.log('User Data ', this.loginUser);
    console.log('isEdit ', this.isEdit);

    this.myProfileForm = new FormGroup({
      'userName': new FormControl(this.loginUser?.userName, Validators.required),
      'fullName': new FormControl(this.loginUser?.fullName, Validators.required),
      'email': new FormControl(this.loginUser?.email, Validators.required),
      'address': new FormControl(this.loginUser?.address, Validators.required),
      'dateOfBirth': new FormControl(this.loginUser?.dateOfBirth, Validators.required),
      'dateOfJoining': new FormControl(this.loginUser?.dateOfJoining, Validators.required),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required),
      'contactNumber': new FormControl(this.loginUser?.contactNumber, Validators.required),
      'roleDetail': new FormControl({
        value: this.loginUser?.roleDetail,
        disabled: true
      }, Validators.required)
    });
    this.disableAllInputs();
  }

  onSubmit() {
    if (this.checkPasswords()) {
      console.log('updated user data ', this.getUserDetailsFromForm());
      this.userService.updateUserData(this.getUserDetailsFromForm()).subscribe(data => {
        console.log('result from api', data);
        Swal.fire('Success', 'Profile updated successfully', 'success');
        this.disableAllInputs();
        this.isEdit = false;
      }, error => {
        console.log(error);
        Swal.fire('Error', 'Error while updating profile', 'error');
        this.disableAllInputs();
        this.isEdit = false;
      });
    }
  }

  checkPasswords() {
    var checkPassword = this.myProfileForm.get('password')?.value === this.myProfileForm.get('confirmPassword')?.value;
    if (!checkPassword) {
      Swal.fire('Error', 'Password and confirm password donot match', 'error');
    }
    return checkPassword;
  }

  udpateUserDetails() {
    var userData = {
      userName: this.loginUser?.userName,
      fullName: this.loginUser?.fullName,
      email: this.loginUser?.email,
      contactNumber: this.loginUser?.contactNumber,
      address: this.loginUser?.address,
      dateOfBirth: this.loginUser?.dateOfBirth,
      dateOfJoining: this.loginUser?.dateOfJoining,
      roleDetail: this.loginUser?.roleDetail,
      password: '',
      confirmPassword: ''
    };
    this.myProfileForm.setValue(userData);
  }

  getUserDetailsFromForm() {
    var updatedUserData = {
      userName: this.myProfileForm?.get('userName')?.value,
      fullName: this.myProfileForm?.get('fullName')?.value,
      email: this.myProfileForm?.get('email')?.value,
      contactNumber: this.myProfileForm?.get('contactNumber')?.value,
      address: this.myProfileForm?.get('address')?.value,
      password: this.myProfileForm.get('password')?.value,
      confirmPassword: this.myProfileForm.get('confirmPassword')?.value
    };
    return updatedUserData;
  }

  disableAllInputs() {
    this.myProfileForm.controls['fullName'].disable();
    this.myProfileForm.controls['email'].disable();
    this.myProfileForm.controls['contactNumber'].disable();
    this.myProfileForm.controls['address'].disable();
    this.myProfileForm.controls['password'].disable();
    this.myProfileForm.controls['confirmPassword'].disable();
    this.myProfileForm.controls['dateOfBirth'].disable();
    this.myProfileForm.controls['dateOfJoining'].disable();
  }

  enableAllInputs() {
    this.myProfileForm.controls['email'].enable();
    this.myProfileForm.controls['contactNumber'].enable();
    this.myProfileForm.controls['address'].enable();
    this.myProfileForm.controls['password'].enable();
    this.myProfileForm.controls['confirmPassword'].enable();
    this.isEdit = true;
  }

}
