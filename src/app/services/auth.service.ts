import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject que mantém os dados do usuário logado
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  public loggedInUser$ = this.loggedInUserSubject.asObservable();

  // Método para atualizar os dados do usuário logado
  setLoggedInUser(user: any) {
    this.loggedInUserSubject.next(user);
  }

  // Método para limpar os dados do usuário ao fazer logout
  logout() {
    this.loggedInUserSubject.next(null);
  }
}
