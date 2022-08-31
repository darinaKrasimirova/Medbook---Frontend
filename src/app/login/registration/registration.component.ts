import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpLoginService } from '../services/http-login.service';
import { User } from "src/app/shared/models/User";
import { catchError, from, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

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
  formGroup!: FormGroup;

  user!: User;
  registrationComplete = false;

  constructor(
    private router: Router,
    private login: HttpLoginService,
    private toastr: ToastrService, 
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.user = {accountType: "user"} as User;

    let validationFn = (): ValidationErrors | null => {
      if(this.accTypeControl?.value == "user"){
        return null;
      }
      if(!this.nameControl?.value || this.nameControl?.value == ''){
        return {name: {value: this.nameControl?.value}};
      }
      return null;
    }

    this.emailControl = new FormControl(this.user.email, [Validators.required, Validators.email]);
    this.usernameControl = new FormControl(this.user.username, Validators.required);
    this.passwordControl = new FormControl("", Validators.required);
    this.accTypeControl = new FormControl(this.user.accountType, validationFn);
    this.nameControl = new FormControl("", validationFn);
    this.formGroup = new FormGroup({
      "email": this.emailControl,
      "username": this.usernameControl,
      "password": this.passwordControl,
      "accType": this.accTypeControl,
      "name": this.nameControl});
  }

  register(){
    this.login.register(this.user).pipe(
      catchError(err => {
        this.toastr.error(this.translate.instant("forms.registration.unsuccessful"), this.translate.instant("messages.error"));
        return of();
      })
    ).subscribe(data => {
      this.registrationComplete = true;
      setTimeout(() => this.router.navigate(['/login']),5000);
    });
  }
}
