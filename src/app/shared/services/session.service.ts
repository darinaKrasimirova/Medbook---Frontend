import { Injectable } from "@angular/core";
import { User } from "src/app/shared/models/User";

@Injectable({
    providedIn: 'root'
  })
  export class SessionService {
    
  getUserFromSession() : User|null {
    return null;
  }
  }