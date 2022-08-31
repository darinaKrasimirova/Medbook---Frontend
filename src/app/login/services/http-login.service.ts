import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/shared/models/Doctor';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get(this.baseUrl + "/users/login", {
      params: {
        "username": username,
        "password": password
      }
    });
  }

  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + "/users", user);
  }

  registerDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.baseUrl + "/doctors", doctor);
  }
}
