import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Workschedule } from 'src/app/shared/models/Workshedule';

@Component({
  selector: 'app-workschedule-item',
  templateUrl: './workschedule-item.component.html',
  styleUrls: ['./workschedule-item.component.css']
})
export class WorkscheduleItemComponent implements OnInit {
  dayControl!: FormControl;
  fromControl!: FormControl;
  toControl!: FormControl;

  @Input() workscheduleItem!: Workschedule;

  constructor() { }

  ngOnInit(): void {
    this.dayControl = new FormControl(this.workscheduleItem.day);
    this.dayControl.valueChanges.subscribe(value => this.workscheduleItem.day = value);

    this.fromControl = new FormControl(this.workscheduleItem.startTime);
    this.fromControl.valueChanges.subscribe(value => this.workscheduleItem.startTime = value);

    this.toControl = new FormControl(this.workscheduleItem.endTime);
    this.toControl.valueChanges.subscribe(value => this.workscheduleItem.endTime = value);
  }
}
