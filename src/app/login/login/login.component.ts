import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { HttpLoginService } from '../services/http-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameControl!: FormControl;
  passwordControl!: FormControl;
  formGroup!: FormGroup;
  wrongCredentials = false;
  
  constructor(private loginService: HttpLoginService) { }
  
  ngOnInit(): void {
    this.usernameControl = new FormControl("", Validators.required);
    this.passwordControl = new FormControl("", Validators.required);
    this.formGroup = new FormGroup({username: this.usernameControl, password: this.passwordControl});
  }

  login(): void {
    this.loginService.login(this.usernameControl.value, this.passwordControl.value).pipe(
      catchError(err => {
        this.wrongCredentials = true;
        return of();
      })
    ).subscribe(data => this.gotoProfile());
  }

  gotoProfile(): void{

  }
}
