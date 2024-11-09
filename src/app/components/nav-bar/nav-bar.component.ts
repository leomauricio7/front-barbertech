import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public auth: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // subject de ficar ouvindos eventos
    this.authService.loggedInUser$.subscribe((isLogged) => {
      if (isLogged) {
        const auth = localStorage.getItem('user_log_barber');
        if (auth) this.auth = JSON.parse(auth);
      } else {
        // pega do local storage caso exista
        const auth = localStorage.getItem('user_log_barber');
        if (auth) {
          this.auth = JSON.parse(auth);
        } else {
          this.auth = null;
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('user_log_barber');
    this.authService.setLoggedInUser(false);
  }
}
