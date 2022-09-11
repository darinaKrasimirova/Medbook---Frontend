import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { Doctor } from 'src/app/shared/models/Doctor';
import { HttpProfileService } from '../services/http-profile.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  doctor?: Doctor;

  constructor(private route: ActivatedRoute, 
    private http: HttpProfileService) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap(params => this.http.getDoctors(Number(params.get("id")))),
      catchError(err => of({} as Doctor))
    ).subscribe(data => this.doctor = data);
  }

}
