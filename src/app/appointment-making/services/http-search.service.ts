import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/Doctor';
import { MedicalField } from '../../shared/models/MedicalField';

@Injectable({
  providedIn: 'root'
})
export class HttpSearchService {
  baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }


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
    
    return this.http.get<Doctor[]>(this.baseUrl + '/doctors', { params: params });
  }
}
