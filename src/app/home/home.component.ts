import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit(): void {
  }

  hasSession():boolean{
    return this.session.hasSession();
  }
}
