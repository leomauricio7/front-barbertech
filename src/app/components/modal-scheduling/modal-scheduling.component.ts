import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal-scheduling',
  templateUrl: './modal-scheduling.component.html',
  styleUrls: ['./modal-scheduling.component.scss'],
})
export class ModalSchedulingComponent implements OnInit, OnChanges {
  @Input() barber: any | null = null;
  @Output() close = new EventEmitter<void>();

  public serviceSelected: any = null;
  public daySelected: any = null;
  public personSelected: any = null;
  public timeSelected: any = null;

  public title: string = 'Selecione um serviço';

  public services = [
    {
      id: 1,
      name: 'Corte Navalhado',
      price: 'R$ 25.50',
    },
    {
      id: 2,
      name: 'Corte Militar',
      price: 'R$ 20.50',
    },
    {
      id: 3,
      name: 'Corte Chanel',
      price: 'R$ 15.50',
    },
    {
      id: 4,
      name: 'Barba',
      price: 'R$ 45.50',
    },
  ];

  public days = [
    {
      name: 'Seg',
      day: 15,
      month: 10,
      year: 2024,
    },
    {
      name: 'Ter',
      day: 16,
      month: 10,
      year: 2024,
    },
    {
      name: 'Qua',
      day: 17,
      month: 10,
      year: 2024,
    },
    {
      name: 'Qui',
      day: 18,
      month: 10,
      year: 2024,
    },
    {
      name: 'Sex',
      day: 19,
      month: 10,
      year: 2024,
    },
    {
      name: 'Sex',
      day: 19,
      month: 10,
      year: 2024,
    },
    {
      name: 'Sex',
      day: 19,
      month: 10,
      year: 2024,
    },
    {
      name: 'Sex',
      day: 19,
      month: 10,
      year: 2024,
    },
    {
      name: 'Sex',
      day: 19,
      month: 10,
      year: 2024,
    },
  ];

  public persons = [
    {
      id: 1,
      name: 'Jose ielmo',
    },
    {
      id: 2,
      name: 'Caio Jose',
    },
    {
      id: 2,
      name: 'Caio Jose',
    },
    {
      id: 2,
      name: 'Caio Jose',
    },
    {
      id: 2,
      name: 'Caio Jose',
    },
    {
      id: 2,
      name: 'Caio Jose',
    },
    {
      id: 2,
      name: 'Caio Jose',
    },
  ];

  public times = [
    {
      id: 1,
      time: '08:00',
    },
    {
      id: 2,
      time: '08:30',
    },

    {
      id: 3,
      time: '11:30',
    },
  ];

  private isDragging = false;
  private startX: number = 0;
  private scrollLeftM: number = 0;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  onClose() {
    this.close.emit();
  }

  schedule(service: any) {
    this.serviceSelected = service;
    this.title = 'Selecione a data';
  }

  setDay(day: any) {
    this.daySelected = day;
  }

  setPerson(person: any) {
    this.personSelected = person;
  }

  setTime(time: any) {
    this.timeSelected = time;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    const scrollContainer = event.currentTarget as HTMLElement; // Asserção de tipo
    this.startX = event.pageX - scrollContainer.getBoundingClientRect().left;
    this.scrollLeftM = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing'; // Muda o cursor durante o arrasto
  }

  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    const scrollContainer = event.currentTarget as HTMLElement; // Asserção de tipo
    scrollContainer.style.cursor = 'grab'; // Retorna o cursor ao normal
  }

  onMouseMove(event: MouseEvent) {
    const scrollContainer = event.currentTarget as HTMLElement; // Asserção de tipo
    if (!this.isDragging) return; // Não faz nada se não está arrastando

    event.preventDefault(); // Previne a seleção de texto
    const x = event.pageX - scrollContainer.getBoundingClientRect().left;
    const walk = (x - this.startX) * 1.5; // Aumenta a sensibilidade do arrasto
    scrollContainer.scrollLeft = this.scrollLeftM - walk;
  }

  scrollLeft(scrollContainer: HTMLElement) {
    const scrollAmount = 100; // Quantidade de rolagem em pixels
    scrollContainer.scrollLeft -= scrollAmount; // Rola para a esquerda
  }

  scrollRight(scrollContainer: HTMLElement) {
    const scrollAmount = 100; // Quantidade de rolagem em pixels
    scrollContainer.scrollLeft += scrollAmount; // Rola para a direita
  }
}
