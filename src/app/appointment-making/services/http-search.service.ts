import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../shared/models/Doctor';
import { Workplace } from '../../shared/models/Workplace';
import { Appointment } from '../../shared/models/Appointment';
import { DateService } from '../../shared/services/date.service';
import { User } from '../../shared/models/User';
import { SlotsPerDate } from '../models/SlotsPerDate';

@Injectable({
  providedIn: 'root'
})
export class HttpSearchService {
  private baseUrl = "http://localhost:8080";
  private doctorUrl = "/doctors";
  private workplaceUrl = "/workplaces"

  constructor(
    private http:HttpClient,
    private dateService: DateService) { }

  getDoctors(cityId: number|null, fieldId: number|null, name: string|null) : Observable<Doctor[]> {
    let params: HttpParams = new HttpParams();
    if(cityId){
      params = params.append("cityId", cityId);
    }
    if(fieldId){
      params = params.append("fieldId", fieldId);
    }
    if(name){
      params = params.append("name", name);
    }
    
    return this.http.get<Doctor[]>(this.baseUrl + this.doctorUrl, { params: params });
  }

  getDoctor(id: number): Observable<Doctor>{
    return this.http.get<Doctor>(this.baseUrl + this.doctorUrl + "/" + id);
  }

  getWorkplacesForDoctor(doctorId: number): Observable<Workplace[]>{
    return this.http.get<Workplace[]>(this.baseUrl + this.workplaceUrl, {
      params: {
        doctorId: doctorId
      }
    });
  }

  getTimeSlots(workplaceId: number, dateRange: Date[]): Observable<SlotsPerDate[]> {
    return this.http.get<SlotsPerDate[]>(this.baseUrl + this.workplaceUrl + "/" + workplaceId + '/timeSlots', 
      {
        params: {
          "rangeBeginning": this.dateService.toDateString(dateRange[0]),
          "rangeEnd": this.dateService.toDateString(dateRange[dateRange.length - 1])
        }
      });
  }

  makeAppointment(doctor: Doctor, date: string, hour: string, workplaceId: number, user: User, comment?:string): Observable<any> {
    let appointment: Appointment = {doctor: doctor, workplace: {id: workplaceId} as Workplace, date: date, time: hour, patient: user, comment:comment};
    return this.http.post(this.baseUrl + "/appointments", appointment);
  }

}
