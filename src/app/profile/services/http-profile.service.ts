import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/shared/models/Appointment';
import { Doctor } from 'src/app/shared/models/Doctor';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpProfileService {

  private baseUrl = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "users/" + username);
  }

  getDoctors(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(this.baseUrl + "doctors/" + id);
  }

  getAppointmentsForUser(user: User): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl + "appointments", {
      params: {
        "userId": user.id ?? 1
      }
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.baseUrl + "users", user);
  }
}
