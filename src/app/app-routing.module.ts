import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from './appointment-making/make-appointment/make-appointment.component';
import { SearchResultsComponent } from './appointment-making/search-results/search-results.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationDoctorInfoComponent } from './login/registration-doctor-info/registration-doctor-info.component';
import { RegistrationDoctorWorkplacesComponent } from './login/registration-doctor-workplaces/registration-doctor-workplaces.component';
import { RegistrationDoctorComponent } from './login/registration-doctor/registration-doctor.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { DoctorProfileComponent } from './profile/doctor-profile/doctor-profile.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'doctors', component:SearchResultsComponent},
  {path: 'appointment', component:MakeAppointmentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent,},
  {path: 'registration/doctor', component: RegistrationDoctorComponent,
    children: [
      {path:'info', component: RegistrationDoctorInfoComponent},
      {path:'workplaces', component: RegistrationDoctorWorkplacesComponent}
    ]
  },
  {path: "profile", component: UserProfileComponent},  
  {path: "doctors/profile", component: DoctorProfileComponent},
  {path: '**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
