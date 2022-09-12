import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpSharedService } from 'src/app/shared/services/http-shared.service';
import { City } from '../../shared/models/City';
import { MedicalField } from '../../shared/models/MedicalField';
import { HttpSearchService } from '../services/http-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  medicalFields$?: Observable<MedicalField[]>;
  cities$?: Observable<City[]>;

  loadingSuccessful: boolean = true;

  fieldControl = new FormControl(0);
  cityControl = new FormControl(0);
  nameContol = new FormControl('');

  constructor(
    private sharedService: HttpSharedService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.getMedicalFields();
  }

  getCities(){
    this.medicalFields$ = this.sharedService.getMedicalFields()
        .pipe(
          catchError(err => {
            this.loadingSuccessful = false;
            return of([])
          })
        );
  }

  getMedicalFields(){
    this.cities$ = this.sharedService.getCities()
        .pipe(
          catchError(err => {
            this.loadingSuccessful = false;
            return of([])
          })
        );
  }

  search(){
    this.router.navigate(
      ["doctors"],
      { queryParams: {
        cityId: this.cityControl.value,
        fieldId: this.fieldControl.value,
        name: this.nameContol.value
      }
      }).catch(err => {console.log(err)})
  }

}
