import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/models/City';
import { MedicalField } from 'src/app/shared/models/MedicalField';
import { HttpSharedService } from 'src/app/shared/services/http-shared.service';
import { Doctor } from '../../shared/models/Doctor';
import { HttpSearchService } from '../services/http-search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  doctors$?: Observable<Doctor[]> ;
  medicalFields$?: Observable<MedicalField[]>;
  cities$?: Observable<City[]>;

  cityControl: FormControl = new FormControl();
  fieldControl: FormControl = new FormControl();
  nameControl: FormControl = new FormControl();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchService: HttpSearchService, 
    private sharedService: HttpSharedService) { }

  ngOnInit(): void {
    this.medicalFields$ = this.sharedService.getMedicalFields();
    this.cities$ = this.sharedService.getCities();
    this.route.queryParamMap.subscribe(paramMap => this.initDoctors(paramMap));
  }

  initDoctors(paramMap: ParamMap): void {
    let cityId = Number(paramMap.get("cityId"));
    let fieldId = Number(paramMap.get("fieldId"))
    let name = paramMap.get("name");
    
    this.doctors$ = this.searchService.getDoctors(cityId, fieldId, name);
    
    this.cityControl.setValue(cityId);
    this.fieldControl.setValue(fieldId);
    this.nameControl.setValue(name);
  }

  gotoDoctor(id: number|undefined): void {
    this.router.navigate(
      ['profile'],
      {
        relativeTo: this.route,
        queryParams: {id: id}
      });
  }

  search(): void {
    this.router.navigate(
      [],
      { relativeTo: this.route,
         queryParams: {
          cityId: this.cityControl.value,
          fieldId: this.fieldControl.value,
          name: this.nameControl.value
        },
        queryParamsHandling: 'merge'
      }
    ).catch(err => console.log(err))
  }

  makeAppointment(doctorId: number){
    this.router.navigate(["appointment"], {
      queryParams: {
        doctorId: doctorId
      }
    })
  }

}
