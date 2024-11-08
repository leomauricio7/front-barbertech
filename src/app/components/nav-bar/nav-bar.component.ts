import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public auth: any;
  loggedInUser: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const auth = localStorage.getItem('user_log_barber');
    if (auth) {
      this.auth = JSON.parse(auth);
      console.log(this.auth);
    } else {
      this.authService.loggedInUser$.subscribe((user) => {
        this.auth = user;
        this.loggedInUser = user;
      });
    }
  }
}
