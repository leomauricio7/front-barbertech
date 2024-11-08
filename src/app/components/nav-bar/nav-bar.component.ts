import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public auth: any;
  constructor() {}

  ngOnInit(): void {
    const auth = localStorage.getItem('user_log_barber');
    if (auth) {
      this.auth = JSON.parse(auth);
      console.log(this.auth)
    }
  }
}
