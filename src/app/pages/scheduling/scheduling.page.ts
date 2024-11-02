import { Component } from '@angular/core';

@Component({
  selector: 'page-scheduling',
  templateUrl: './scheduling.page.html',
  styleUrls: ['./scheduling.page.scss'],
})
export class SchedulingPage {
  public schedulings = [
    {
      id: 1,
      name: 'Barbearia Dom Renato',
      logo: 'assets/images/logoBarbearia.png',
      address: 'Rua A5, Natal - RN',
      distance: '31,21Km',
      date: '24/10/2024',
      time: '08:30',
      service: 'Corte Navalhado',
      price: 'R$ 35,50',
      status: ' Concluido',
    },
    {
      id: 2,
      name: 'Barbearia Dom Renato',
      logo: 'assets/images/logoBarbearia.png',
      address: 'Rua A5, Natal - RN',
      distance: '31,21Km',
      date: '24/10/2024',
      time: '08:30',
      service: 'Corte Militar',
      price: 'R$ 30,50',
      status: ' Pendente',
    },
  ];

  collapsedStates: { [key: string]: boolean } = {};

  constructor() {
    this.schedulings.forEach((scheduling) => {
      this.collapsedStates[scheduling.id] = false;
    });
  }

  toggleCollapse(id: number) {
    this.collapsedStates[id] = !this.collapsedStates[id];
  }


}
