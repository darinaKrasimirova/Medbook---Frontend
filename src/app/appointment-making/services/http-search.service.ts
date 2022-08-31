import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../shared/models/Doctor';
import { Workplace } from '../../shared/models/Workplace';
import { Appointment } from '../models/Appointment';
import { DateService } from './date.service';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpSearchService {
  private baseUrl = "http://localhost:8080";

  constructor(
    private http:HttpClient,
    private dateService: DateService) { }

  getDoctors(cityId: number|null, fieldId: number|null, name: string|null) : Observable<Doctor[]> {
    let params: HttpParams = new HttpParams();
    if(cityId){
      params.append("cityId", cityId);
    }
    if(fieldId){
      params.append("fieldId", fieldId);
    }
    if(name){
      params.append("name", name);
    }
    
    return this.http.get<Doctor[]>(this.baseUrl + "/doctors", { params: params });
  }

  getDoctor(id: number): Observable<Doctor>{
    return this.http.get<Doctor>(this.baseUrl + "/doctors" + id);
  }

  getWorkplacesForDoctor(doctorId: number): Observable<Workplace[]>{
    return this.http.get<Workplace[]>(this.baseUrl + "/doctors" + doctorId + "/workplaces");
  }

  getTimeSlots(doctorId: number, dateRange: Date[]): Observable<any> {
    return this.http.get(this.baseUrl + "/doctors" + doctorId + '/timeSlots', 
      {
        params: {
          "rangeBeginning": this.dateService.toDateString(dateRange[0]),
          "rangeEnd": this.dateService.toDateString(dateRange[dateRange.length - 1])
        }
      });
  }

  makeAppointment(doctor: Doctor, date: string, hour: string, workplace: Workplace, user: User): Observable<any> {
    let appointment: Appointment = {doctor: doctor, workplace: workplace, date: date, time: hour, patient: user};
    return this.http.post(this.baseUrl + "/appointments", appointment);
  }

}
