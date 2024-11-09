import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject = new BehaviorSubject<boolean>(false);
  public loggedInUser$ = this.loggedInUserSubject.asObservable();


  setLoggedInUser(isLogged: boolean) {
    this.loggedInUserSubject.next(isLogged);
  }


}
