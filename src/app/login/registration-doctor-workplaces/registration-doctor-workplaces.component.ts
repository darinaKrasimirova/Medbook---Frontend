import { Component, OnInit } from '@angular/core';
import { Workplace } from 'src/app/shared/models/Workplace';

@Component({
  selector: 'app-registration-doctor-workplaces',
  templateUrl: './registration-doctor-workplaces.component.html',
  styleUrls: ['./registration-doctor-workplaces.component.css']
})
export class RegistrationDoctorWorkplacesComponent implements OnInit {
  workplaces: Workplace[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addNewWorkplace(){
    this.workplaces[this.workplaces.length] = {} as Workplace;
  }
  
  removeWorkplace(workplace: Workplace){
    let index = this.workplaces.indexOf(workplace);
    this.workplaces.splice(index, 1)
  }

  setWorkplaces(workplaces: Workplace[]){
    this.workplaces = workplaces;
  }
}
