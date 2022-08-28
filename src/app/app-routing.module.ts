import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from './appointment-making/make-appointment/make-appointment.component';
import { SearchResultsComponent } from './appointment-making/search-results/search-results.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'doctors', component:SearchResultsComponent},
  {path: 'appointment', component:MakeAppointmentComponent},
  {path: 'doctor/:id', component:MakeAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
