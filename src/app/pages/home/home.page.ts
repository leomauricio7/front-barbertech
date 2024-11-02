import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public barbers = [
    {
      name: 'Barbearia Dom Renato',
      logo: 'assets/images/logoBarbearia.png',
      address: 'Rua A5, Natal - RN',
      distance: '31,21Km',
    },
  ];
  constructor() {}
}
