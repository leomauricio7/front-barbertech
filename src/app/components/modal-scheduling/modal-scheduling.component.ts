import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IBarber } from 'src/app/interfaces/barber.interface';
import { ICompany } from 'src/app/interfaces/company.interface';
import { IScheduling } from 'src/app/interfaces/scheduling.interface';
import { IService } from 'src/app/interfaces/service.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-scheduling',
  templateUrl: './modal-scheduling.component.html',
  styleUrls: ['./modal-scheduling.component.scss'],
})
export class ModalSchedulingComponent implements OnInit, OnChanges {
  @Input() barber: ICompany | null = null;
  @Output() close = new EventEmitter<void>();

  public isLoad: boolean = false;
  public isSubmitForm: boolean = false;
  public isSuccesScheduling: boolean = false;
  public serviceSelected: IService | null = null;
  public daySelected: any = null;
  public personSelected: IBarber | null = null;
  public timeSelected: any = null;
  public title: string = 'Selecione um serviço';
  public services!: IService[];
  public days = this.generateDatesArray(15);
  public persons!: IBarber[];
  public times!: string[];
  public auth: any;

  private isDragging = false;
  private startX: number = 0;
  private scrollLeftM: number = 0;

  constructor(
    private readonly apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.barber) {
      this.getServices(this.barber.id.toString());
    }

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

  ngOnChanges(changes: SimpleChanges): void {}

  onClose() {
    this.close.emit();
  }

  submitScheduling() {
    if (this.barber && this.personSelected && this.serviceSelected) {
      this.isSubmitForm = true;
      this.isLoad = true;
      const data: IScheduling = {
        id: 0,
        idBarber: this.personSelected.id,
        idClient: this.auth.client.id,
        idCompany: this.barber?.id,
        idService: this.serviceSelected.id,
        date: `${this.daySelected.year}-${this.daySelected.month}-${this.daySelected.day}T${this.timeSelected}:00`,
        status: 'PENDENTE',
      };
      this.apiService.scheduling(data).subscribe({
        next: (response) => (this.isSuccesScheduling = true),
        error: (er) => console.error(er),
        complete: () => ((this.isSubmitForm = false), (this.isLoad = false)),
      });
    }
  }

  schedule(service: IService) {
    this.serviceSelected = service;
    this.title = 'Selecione a data';
  }

  setDay(day: any) {
    this.daySelected = day;
    if (this.barber && this.serviceSelected) {
      this.getBarbers(
        this.barber.id.toString(),
        this.serviceSelected.id.toString()
      );
      this.persons = [];
      this.personSelected = null;
      this.times = [];
      this.timeSelected = null;
    }
  }

  setPerson(person: IBarber) {
    this.personSelected = null;
    this.personSelected = person;
    if (person && this.daySelected) {
      const dateFormat = `${this.daySelected.year}-${this.daySelected.month}-${this.daySelected.day}`;
      this.getBarbersTimesAvailability(person.id.toString(), dateFormat);
    }
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

  private getServices(idCompany: string): void {
    this.isLoad = true;
    this.apiService.getServices(idCompany).subscribe({
      next: (services: IService[]) => (this.services = services),
      error: (er) => console.error(er),
      complete: () => (this.isLoad = false),
    });
  }

  private getBarbers(idCompany: string, idService: string): void {
    this.isLoad = true;
    this.apiService.getBarbers(idCompany, idService).subscribe({
      next: (barbers: IBarber[]) => (this.persons = barbers),
      error: (er) => console.error(er),
      complete: () => (this.isLoad = false),
    });
  }

  private getBarbersTimesAvailability(idBarber: string, date: string): void {
    this.isLoad = true;
    this.apiService.getBarbersTimesAvailability(idBarber, date).subscribe({
      next: (times: string[]) => (this.times = times),
      error: (er) => console.error(er),
      complete: () => (this.isLoad = false),
    });
  }

  private generateDatesArray(days: number): any[] {
    const datesArray = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Formatar o dia com dois dígitos
      const day = String(currentDate.getDate()).padStart(2, '0');

      datesArray.push({
        name: currentDate.toLocaleString('pt-BR', { weekday: 'short' }),
        day: day, // Agora o dia sempre terá dois dígitos
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      });
    }

    return datesArray;
  }
}
