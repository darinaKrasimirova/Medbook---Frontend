import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { Doctor } from '../../shared/models/Doctor';
import { Workplace } from '../../shared/models/Workplace';
import { DateService } from '../services/date.service';
import { HttpSearchService } from '../services/http-search.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {
  
  dateControl: FormControl = new FormControl(this.dateService.toDateString(new Date()));
  workplaceControl: FormControl = new FormControl("");

  workplaces$?: Observable<Workplace[]>;
 
  selectPlaceDisabled = false;
  dateRange: Date[] = [];
  slotsPerDate = new Map<string,{time: string, disabled: boolean}[]>();

  doctor?: Doctor;
  selectedHour?: {day: string, hour: string};

  constructor(
    private route: ActivatedRoute,
    private dateService:DateService,
    private searchService: HttpSearchService,
    private toast: ToastrService, 
    private translate: TranslateService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.dateRange = this.dateService.getRange(5, -1);

    this.workplaceControl.valueChanges.subscribe(e => this.loadSlots());
    this.dateControl.valueChanges
      .subscribe(e => {
        this.dateRange = this.dateService.getRange(5, -1, new Date(e));
        this.loadSlots();
      });

    this.workplaces$ = this.route.queryParamMap.pipe(
      switchMap(params => this.searchService.getDoctor(Number(params.get("doctorId")))),
      switchMap(doc => {
        this.doctor = doc;
        return this.searchService.getWorkplacesForDoctor(doc.id ? doc.id : 0)
      }),
      catchError(err => {
        return of([])
      })
    );
  }

  loadPreviousRange(): void {
    this.dateRange = this.dateService.getRange(5, -5, this.dateRange[0]); 
    this.loadSlots();
  }

  loadNextRange(): void {
    this.dateRange = this.dateService.getRange(5, 1, this.dateRange[4]);
    this.loadSlots();
  }

  loadSlots(): void {
    this.searchService.getTimeSlots(this.doctor?.id ? this.doctor.id : 0, this.dateRange)
      .subscribe(data => {
        //set slots
      })
  }

  makeAppointment(){
    if(!this.selectedHour){
      this.toast.warning(this.translate.instant("forms.makeAppointment.notSelected"), this.translate.instant("messages.warning"));
      return;
    }
    let user = this.session.getUserFromSession();
    if(!user){
      return;
    }
    if(!this.doctor){
      return;
    }
    this.searchService.makeAppointment(this.doctor, this.selectedHour.day, this.selectedHour.hour, this.workplaceControl.value, user)
      .subscribe(next => {},
                err => this.toast.error(this.translate.instant("forms.makeAppointment.unsuccessful"), this.translate.instant("messages.error")),
                () => this.toast.success(this.translate.instant("forms.makeAppointment.successful"), this.translate.instant("messages.success")));
  } 

  setSelected(date: Date, time: string){
    this.selectedHour = {day: this.dateToString(date), hour: time}

    this.dateRange.forEach(date => {
      let dateString = this.dateToString(date);
      this.slotsPerDate.get(dateString)?.forEach(slot => {
        if(!(dateString === this.selectedHour?.day) || !(slot.time === this.selectedHour?.hour)){
          document.getElementById("btn" + dateString + slot.time)?.classList.remove('active');
        }
      })
    });

  }

  public dateToString(date: Date): string{
    return this.dateService.toDateString(date);
  }
}
