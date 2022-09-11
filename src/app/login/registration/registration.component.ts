import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpLoginService } from '../services/http-login.service';
import { User } from "src/app/shared/models/User";
import { catchError, from, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emailControl!: FormControl;
  usernameControl!: FormControl;
  passwordControl!: FormControl;
  accTypeControl!: FormControl;
  nameControl!: FormControl;
  phoneControl!:FormControl;
  formGroup!: FormGroup;

  user!: User;
  registrationComplete = false;
  usernameExists = false;

  constructor(
    private router: Router,
    private login: HttpLoginService,
    private toastr: ToastrService, 
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.user = {accountType: "PATIENT"} as User;

    this.emailControl = new FormControl(this.user.email, [Validators.required, Validators.email]);
    this.emailControl.valueChanges.subscribe(data => this.user.email = data);

    this.usernameControl = new FormControl(this.user.username, Validators.required);
    this.usernameControl.valueChanges.subscribe(data => this.user.username = data);

    this.passwordControl = new FormControl("", Validators.required);
    this.passwordControl.valueChanges.subscribe(data => this.user.password = data);

    this.accTypeControl = new FormControl(this.user.accountType);
    this.accTypeControl.valueChanges.subscribe(data => {
      this.user.accountType = data;
      this.nameControl.updateValueAndValidity();
    });

    this.nameControl = new FormControl(this.user.name, (control): ValidationErrors | null => {
      if(this.accTypeControl.value === "PATIENT"){
        return null;
      }
      if(!control.value || control.value === ''){
        return {name: control.value};
      }
      return null;
    });
    this.nameControl.valueChanges.subscribe(data => this.user.name = data);

    this.phoneControl = new FormControl("");
    this.phoneControl.valueChanges.subscribe(data => this.user.phoneNumber = data);

    this.formGroup = new FormGroup({
      "email": this.emailControl,
      "username": this.usernameControl,
      "password": this.passwordControl,
      "accType": this.accTypeControl,
      "name": this.nameControl,
      "phoneNumber": this.phoneControl});
  }

  register(){
    this.login.register(this.user).pipe(
      catchError(err => {
        this.toastr.error(this.translate.instant("forms.registration.unsuccessful"), this.translate.instant("messages.error"));
        return of();
      })
    ).subscribe(data => {
      this.registrationComplete = true;
      setTimeout(() => this.router.navigate(['login']), 5000);
    });
  }

  checkUniqueUsername(){
    this.login.checkUsername(this.user.username).pipe(
      catchError(err => of())
    )
    .subscribe(data => {
      this.usernameExists = data;
    })
  }
}
