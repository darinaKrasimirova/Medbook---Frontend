import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medbook';
  
  constructor(private session: SessionService, private router: Router){}

  hasSession(): boolean{
    return this.session.hasSession();
  }

  logout(){
    this.session.logout();
    this.router.navigate([""]);
  }
}
