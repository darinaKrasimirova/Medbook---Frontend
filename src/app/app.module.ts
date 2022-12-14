import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modules and services
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomHttpInterceptor } from './shared/CustomHttpInterceptor';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './appointment-making/search/search.component';
import { SearchResultsComponent } from './appointment-making/search-results/search-results.component'; 
import { MakeAppointmentComponent } from './appointment-making/make-appointment/make-appointment.component';
import { LoginComponent } from './login/login/login.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { RegistrationDoctorInfoComponent } from './login/registration-doctor-info/registration-doctor-info.component';
import { RegistrationDoctorComponent } from './login/registration-doctor/registration-doctor.component';
import { RegistrationDoctorWorkplacesComponent } from './login/registration-doctor-workplaces/registration-doctor-workplaces.component';
import { WorkplaceFormComponent } from './login/workplace-form/workplace-form.component';
import { WorkscheduleItemComponent } from './login/workschedule-item/workschedule-item.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { DoctorProfileComponent } from './profile/doctor-profile/doctor-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    SearchResultsComponent,
    MakeAppointmentComponent,
    LoginComponent,
    RegistrationComponent,
    RegistrationDoctorInfoComponent,
    RegistrationDoctorComponent,
    RegistrationDoctorWorkplacesComponent,
    WorkplaceFormComponent,
    WorkscheduleItemComponent,
    UserProfileComponent,
    DoctorProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'bg'
    }),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}