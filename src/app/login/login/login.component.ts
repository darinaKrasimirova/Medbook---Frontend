import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { SessionService } from 'src/app/shared/services/session.service';
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
  
  constructor(private loginService: HttpLoginService,
    private router: Router,
    private route: ActivatedRoute,
    private session: SessionService) { }
  
  ngOnInit(): void {
    this.usernameControl = new FormControl("", Validators.required);
    this.passwordControl = new FormControl("", Validators.required);
    this.formGroup = new FormGroup({"username": this.usernameControl, "password": this.passwordControl});
  }

  login(): void {
    this.loginService.login(this.usernameControl.value, this.passwordControl.value).pipe(
      catchError(err => {
        this.wrongCredentials = true;
        return of();
      })
    ).subscribe(data => this.gotoProfile(data));
  }

  gotoProfile(data: any): void{
    let username = this.session.createSession(data);

    if(this.route.snapshot.queryParamMap.has("prev")){
      let str = this.route.snapshot.queryParamMap.get("prev") ?? ("profile?username=" + username);
      this.router.navigateByUrl(str);
    }else{
      this.router.navigate(["profile"], {
        queryParams : {
          "username": username
        }
      });
    }
  }
}
