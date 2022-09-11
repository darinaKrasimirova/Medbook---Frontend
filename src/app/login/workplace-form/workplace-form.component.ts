import { Component,Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { City } from 'src/app/shared/models/City';
import { Workplace } from 'src/app/shared/models/Workplace';
import { Workschedule } from 'src/app/shared/models/Workshedule';
import { HttpSharedService } from 'src/app/shared/services/http-shared.service';

@Component({
  selector: 'app-workplace-form',
  templateUrl: './workplace-form.component.html',
  styleUrls: ['./workplace-form.component.css']
})
export class WorkplaceFormComponent implements OnInit {
  cities$!: Observable<City[]>;

  cityControl!: FormControl;
  addressControl!: FormControl;
  nameControl!: FormControl;

  workschedules: Workschedule[] = [];

  @Input() workplace!: Workplace;

  constructor( 
    private sharedService: HttpSharedService
  ) { }

  ngOnInit(): void {
    this.cities$ = this.sharedService.getCities();

    this.cityControl = new FormControl(this.workplace.city);
    this.cityControl.valueChanges.subscribe(e => this.workplace.city = {id:Number(e)});

    this.addressControl = new FormControl(this.workplace.address);
    this.addressControl.valueChanges.subscribe(e => this.workplace.address = e);

    this.nameControl = new FormControl(this.workplace.name);
    this.nameControl.valueChanges.subscribe(e => this.workplace.name = e);

    if(!this.workplace.workschedule){
      this.workplace.workschedule = this.workschedules;
      this.workschedules[0] = {day: 1} as Workschedule;
    } else {
      this.workschedules = this.workplace.workschedule;
    }
  }

  addNewItem(){
    this.workschedules[this.workschedules.length] = {day: 1} as Workschedule;
  }

  removeSelf(item: Workschedule){
    let index = this.workschedules.indexOf(item);
    this.workschedules.splice(index, 1);
  }
}
