import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, find, Observable, of, switchMap, tap } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { Doctor } from '../../shared/models/Doctor';
import { Workplace } from '../../shared/models/Workplace';
import { DateService } from '../../shared/services/date.service';
import { SlotsPerDate } from '../models/SlotsPerDate';
import { HttpSearchService } from '../services/http-search.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {
  
  dateControl: FormControl = new FormControl(this.dateService.toDateString(new Date()));
  workplaceControl: FormControl = new FormControl("");
  commentControl: FormControl = new FormControl("");

  workplaces$?: Observable<Workplace[]>;
 
  selectPlaceDisabled = false;
  dateRange: Date[] = [];
  slotsPerDate: SlotsPerDate[] = [];

  doctor?: Doctor;
  selectedHour?: {day: string, hour: string};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dateService:DateService,
    private searchService: HttpSearchService,
    private toast: ToastrService, 
    private translate: TranslateService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    if(!this.session.hasSession()){
      console.log(this.route)
      this.router.navigate(["login"], {
        queryParams: {
          prev: "appointment?id=" + this.route.snapshot.queryParamMap.get("id")
        }
      })
      return;
    }

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
        return this.searchService.getWorkplacesForDoctor(doc.id ?? 0)
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
    this.searchService.getTimeSlots(this.workplaceControl.value, this.dateRange)
      .subscribe(data => {
        this.slotsPerDate = data;
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
    this.searchService.makeAppointment(this.doctor, this.selectedHour.day, this.selectedHour.hour, Number(this.workplaceControl.value), user, this.commentControl.value).pipe(
      catchError(err => {
        this.toast.error(this.translate.instant("forms.makeAppointment.unsuccessful"), this.translate.instant("messages.error"));
        return of();
      })
    ).subscribe(data => this.toast.success(this.translate.instant("forms.makeAppointment.successful"), this.translate.instant("messages.success")));
  } 

  setSelected(date: Date, time: string){
    this.selectedHour = {day: this.dateToString(date), hour: time}

    this.dateRange.forEach(date => {
      let dateString = this.dateToString(date);
      this.slotsPerDate.find(e => e.date === dateString)?.slots.forEach(slot => {
        if(!(dateString === this.selectedHour?.day) || !(slot.time === this.selectedHour?.hour)){
          document.getElementById("btn" + dateString + slot.time)?.classList.remove('active');
        }
      })
    });

  }

  public dateToString(date: Date): string{
    return this.dateService.toDateString(date);
  }

  getSlotsForDate(day: Date): {time: string, taken: boolean}[] {
    return this.slotsPerDate.find(({date}) => date === this.dateToString(day))?.slots ?? [];
  }

  isInThePast(day: Date, time: string): boolean{
    let splitted = time.split(":");
    day.setHours(Number(splitted[0]));
    day.setMinutes(Number(splitted[1]))
    return day <= new Date();
  }
}
