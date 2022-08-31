import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { catchError, Observable, of, ReplaySubject } from 'rxjs';
import { Doctor } from 'src/app/shared/models/Doctor';
import { MedicalField } from 'src/app/shared/models/MedicalField';
import { HttpSharedService } from 'src/app/shared/services/http-shared.service';

@Component({
  selector: 'app-registration-doctor-info',
  templateUrl: './registration-doctor-info.component.html',
  styleUrls: ['./registration-doctor-info.component.css']
})
export class RegistrationDoctorInfoComponent implements OnInit {
  medicalFields$!: Observable<MedicalField[]>;

  fieldControl!: FormControl;
  dateControl!: FormControl;
  personalDescritionControl!: FormControl;
  educationDescritionControl!: FormControl;
  practiceDescritionControl!: FormControl;
  servicesDescritionControl!: FormControl;

  doctor!: Doctor;

  constructor(
    private sharedService: HttpSharedService) { }

  ngOnInit(): void {
    this.medicalFields$ = this.sharedService.getMedicalFields().pipe(
      catchError(err => {
        return of([{id:1, name: "test"}]);
      })
    );

    this.fieldControl = new FormControl(this.doctor?.medicalField ?? 0);
    this.fieldControl.valueChanges.subscribe(data => this.doctor.medicalField = data);

    this.dateControl = new FormControl(this.doctor?.practiceStart);
    this.dateControl.valueChanges.subscribe(data => this.doctor.practiceStart = data);
    
    this.personalDescritionControl = new FormControl(this.doctor?.personalDescription);
    this.personalDescritionControl.valueChanges.subscribe(data => this.doctor.personalDescription = data);
    
    this.educationDescritionControl = new FormControl(this.doctor?.educationDescription);
    this.educationDescritionControl.valueChanges.subscribe(data => this.doctor.educationDescription = data);
    
    this.practiceDescritionControl = new FormControl(this.doctor?.practiceDescription);
    this.practiceDescritionControl.valueChanges.subscribe(data => this.doctor.practiceDescription = data);
    
    this.servicesDescritionControl = new FormControl(this.doctor?.servicesDescription);
    this.servicesDescritionControl.valueChanges.subscribe(data => this.doctor.servicesDescription = data);
  }

  setDoctor(doc: Doctor){
    this.doctor = doc;
  }

  toBase64($event:any){
    const file = $event?.target?.files[0];
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));
    result.subscribe(data => this.doctor.image = data);
  }
}
