import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/City';
import { MedicalField } from '../models/MedicalField';

@Injectable({
  providedIn: 'root'
})
export class HttpSharedService {
  baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }
  
  getMedicalFields() : Observable<MedicalField[]> {
    return this.http.get<MedicalField []>(this.baseUrl + '/enumeration/medicalFields');
  }

  getCities() : Observable<City[]> {
    return this.http.get<MedicalField []>(this.baseUrl + '/enumeration/cities'); 
  }
}
