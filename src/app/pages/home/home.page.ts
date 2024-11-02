import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public barbers = [
    {
      id: 1,
      name: 'Barbearia Dom Renato',
      logo: 'assets/images/logoBarbearia.png',
      address: 'Rua A5, Natal - RN',
      distance: '31,21Km',
    },
    {
      id: 2,
      name: 'Barbearia Dom Renato',
      logo: 'assets/images/logoBarbearia.png',
      address: 'Rua A5, Natal - RN',
      distance: '31,21Km',
    },
  ];
  public selectedBarber = null;

  constructor() {}

  openModal(barber: any) {
    this.selectedBarber = barber;
  }

  closeModal() {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show'); // Inicia a animação de saída
      setTimeout(() => {
        this.selectedBarber = null; // Remove o modal do DOM após a animação
      }, 300); // O tempo deve ser igual ao tempo de transição
    }
  }
}
