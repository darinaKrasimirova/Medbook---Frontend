import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './services/session.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(
    private session: SessionService,
    private http: HttpClient
  ){}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.requireToken(httpRequest)){
      let token = this.session.getToken() ?? "";
      console.log("da")
      return next.handle(httpRequest.clone({setHeaders : {"Authorization": "Bearer " + token}}));
    }
    console.log("ne")
    return next.handle(httpRequest);
  }

  requireToken(request: HttpRequest<any>): boolean{
    if(request.url.startsWith("http://localhost:8080/appointments"))
      return true;

    if(request.url != "http://localhost:8080/users/exist"  && request.url.startsWith("http://localhost:8080/users") && request.method != "POST")
      return true;
    
    return false;
  }
}