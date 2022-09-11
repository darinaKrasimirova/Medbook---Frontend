import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medbook';
  
  constructor(
    private session: SessionService, 
    private router: Router,
    private translate: TranslateService) { }


  hasSession(): boolean{
    return this.session.hasSession();
  }

  logout(){
    this.session.logout();
    this.router.navigate([""]);
  }

  changeSiteLanguage(code: string){
    this.translate.use(code);
  }
}
