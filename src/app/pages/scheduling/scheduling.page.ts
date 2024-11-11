import { Component, OnInit } from '@angular/core';
import { IListScheduling } from 'src/app/interfaces/scheduling.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'page-scheduling',
  templateUrl: './scheduling.page.html',
  styleUrls: ['./scheduling.page.scss'],
})
export class SchedulingPage implements OnInit {
  public schedulings!: IListScheduling[];
  public isLoad: boolean = false;
  public auth: any;
  collapsedStates: { [key: string]: boolean } = {};

  sort: string = 'date'
  direction: string = 'DESC'

  constructor(
    private readonly http: ApiService,
    private authService: AuthService
  ) {}

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

    // caso for login de cliente pego o ID e pucho os agendamentos
    if(this.auth.role === 'CLIENT'){
      this.getScheduling(this.auth.client.id)
    }
  }

  toggleCollapse(id: number) {
    this.collapsedStates[id] = !this.collapsedStates[id];
  }

  private getScheduling(idClient: string) {
    this.isLoad = true;
    this.http.getScheduling(idClient, this.sort, this.direction).subscribe({
      next: (response: IListScheduling[]) => {
        this.schedulings = response;
        this.schedulings.forEach((scheduling) => {
          this.collapsedStates[scheduling.id] = false;
        });
      },
      error: (er) => console.error(er),
      complete: () => (this.isLoad = false),
    });
  }

  onOptionSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sort = selectElement.value;
    console.log('Opção selecionada:', this.sort);

    // Chame o método que aplica a ordenação usando o valor selecionado
    this.getScheduling(this.auth.client.id);
  }
}
