import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Doctor } from 'src/app/shared/models/Doctor';
import { Workplace } from 'src/app/shared/models/Workplace';
import { SessionService } from 'src/app/shared/services/session.service';
import { HttpLoginService } from '../services/http-login.service';

@Component({
  selector: 'app-registration-doctor',
  templateUrl: './registration-doctor.component.html',
  styleUrls: ['./registration-doctor.component.css']
})
export class RegistrationDoctorComponent implements OnInit {
  registrationComplete = false;

  doctor?: Doctor;
  workplaces?: Workplace[];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private service: HttpLoginService,
    private toastr: ToastrService, 
    private translate: TranslateService,
    private session: SessionService) { }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(params => {
    //   let userId = params.get("userId");
    //   if(this.doctor){
    //     this.doctor.userId = Number(userId);
    //   }
    // });

    if(this.route.children.length == 0){
      this.gotoPrevious();
      return;
    }

    if(this.route.children[0].routeConfig?.path === "info"){
      document.getElementById("btnNext")?.classList.remove("hidden");
      document.getElementById("btnPrevious")?.classList.add("hidden");
      document.getElementById("btnConfirm")?.classList.add("hidden");
    } else {      
      document.getElementById("btnNext")?.classList.add("hidden");
      document.getElementById("btnPrevious")?.classList.remove("hidden");
      document.getElementById("btnConfirm")?.classList.remove("hidden");
    }
  }

  onActivate(component:any){
    if(!this.doctor){
      let username = this.session.getUserFromSession()?.username;
      this.doctor = {username: username} as Doctor;
    }
    if(typeof component.setDoctor === 'function'){
      component.setDoctor(this.doctor);
    }

    if(!this.workplaces){
      this.workplaces = [{} as Workplace];
    }
    if(typeof component.setWorkplaces === 'function'){
      component.setWorkplaces(this.workplaces);
    }
  }

  gotoPrevious(){
    this.router.navigate(["info"], {relativeTo: this.route})
    document.getElementById("btnNext")?.classList.remove("hidden");
    document.getElementById("btnPrevious")?.classList.add("hidden");
    document.getElementById("btnConfirm")?.classList.add("hidden");
  }

  gotoNext(){
    this.router.navigate(["workplaces"], {relativeTo: this.route})
    document.getElementById("btnNext")?.classList.add("hidden");
    document.getElementById("btnPrevious")?.classList.remove("hidden");
    document.getElementById("btnConfirm")?.classList.remove("hidden");
  }
  
  completeRegistration(){
    this.doctor!.workplaces = this.workplaces;
    this.service.registerDoctor(this.doctor!).pipe(
      catchError(err => {
        this.toastr.error(this.translate.instant("forms.registration.unsuccessful"), this.translate.instant("messages.error"));
        return of();
      })
    ).subscribe(data => {
      this.registrationComplete = true;
      setTimeout(() => this.router.navigate(['/profile'], {
        queryParams: {
          "username": this.session.getUserFromSession()?.username
        }
      }),5000);
    });
  }
}
