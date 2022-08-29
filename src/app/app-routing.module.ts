import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from './appointment-making/make-appointment/make-appointment.component';
import { SearchResultsComponent } from './appointment-making/search-results/search-results.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'doctors', component:SearchResultsComponent},
  {path: 'appointment', component:MakeAppointmentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
