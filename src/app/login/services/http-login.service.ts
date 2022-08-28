import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
