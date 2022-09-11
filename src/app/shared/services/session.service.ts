import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "src/app/shared/models/User";
import jwt_decode  from "jwt-decode"

@Injectable({
    providedIn: 'root'
  })
  export class SessionService {
    constructor(private http: HttpClient) { }
    
    getUserFromSession() : User|null {
      return {id: 1} as User;
    }

    getToken(): string|null{
      return localStorage.getItem("jwt");
    }

    createSession(token:any): string{
      localStorage.setItem("jwt", token["jwt-token"]);
      let dtoken:any = jwt_decode(token["jwt-token"]);
      console.log(dtoken)
      return dtoken.username;
    }

    logout(){
      localStorage.removeItem("jwt");
    }

    hasSession(): boolean{
      let token = localStorage.getItem("jwt");
      if(token == null) return false;
      let dtoken:any = jwt_decode(token);
      let date = new Date(0);
      date.setUTCSeconds(dtoken.exp);
      return date > new Date();
    }
  }