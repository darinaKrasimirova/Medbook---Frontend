import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { Appointment } from 'src/app/shared/models/Appointment';
import { User } from 'src/app/shared/models/User';
import { HttpProfileService } from '../services/http-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user?:User;
  appointments$?: Observable<Appointment[]>;
  
  formActive = false;

  emailControl!: FormControl; 
  passwordControl!: FormControl;
  password2Control!: FormControl;
  nameControl!: FormControl;
  phoneControl!: FormControl;
  formGroup!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpProfileService,
    private transalate: TranslateService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(param => this.httpService.getUser(param.get("username") ?? "")),
      catchError(err => {
        if(err.status == 401){
          this.router.navigate(["login"]);
        }
        console.log(err)
        this.appointments$ = of();
        return of({} as User);
      })
    ).subscribe(data => {
      this.user = data;
      this.emailControl.reset(this.user.email);
      this.nameControl.reset(this.user.name);
      this.phoneControl.reset(this.user.phoneNumber);
      this.appointments$ = this.httpService.getAppointmentsForUser(this.user).pipe(
        tap(e => console.log(e)),
        catchError(err => of([]))
      );
    });

    this.emailControl = new FormControl(this.user?.email, Validators.email);
    this.emailControl.valueChanges.subscribe(data => this.user!.email = data);

    let validationFn = (): ValidationErrors | null => {
      if(this.passwordControl?.value === this.password2Control?.value){
        return null;
      }
      return {match: {value: true}};
    }
    
    this.passwordControl = new FormControl("", validationFn);    
    this.password2Control = new FormControl("", validationFn);
    this.passwordControl.valueChanges.subscribe(data => {this.password2Control.updateValueAndValidity({emitEvent: false}); console.log(this.formGroup)});
    this.password2Control.valueChanges.subscribe(data => this.passwordControl.updateValueAndValidity({emitEvent: false}));
    
    this.nameControl = new FormControl(this.user?.name);
    this.nameControl.valueChanges.subscribe(data => this.user!.name = data);

    this.phoneControl = new FormControl(this.user?.phoneNumber);
    this.phoneControl.valueChanges.subscribe(data => this.user!.phoneNumber = data);
    
    this.formGroup = new FormGroup({
      "email": this.emailControl,
      "password": this.passwordControl,
      "name": this.nameControl,
      "phoneNumber": this.phoneControl});
  }

  updateUserData(){
    if(this.passwordControl.value){
      this.user!.password = this.passwordControl.value;
    }

    
    this.httpService.updateUser(this.user!).pipe(
      catchError(err => {
        console.log(err)
        this.toastr.error(this.transalate.instant("forms.userProfile.dataNotUpdated"), this.transalate.instant("messages.error"));
        return of();
      })
    ).subscribe(data => this.toastr.success(this.transalate.instant("forms.userProfile.dataUpdated"), this.transalate.instant("messages.success")));
  }

  toHumanReadableDate(date: string): string{
    let d = new Date(date);
    return d.getDate() + " " + this.transalate.instant("enums.months." + d.getMonth()) + " " + d.getFullYear();
  }

  doctorRegistration(){
    this.router.navigate(["registration", "doctor"]);
  }

}
